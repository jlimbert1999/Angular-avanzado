import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import jwt_decode from "jwt-decode";
import { Usuarios } from '../models/usuario.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuario: Usuarios //user que inicio sesion actualmente
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService) {

  }
  get token(): string {
    return localStorage.getItem('token') || ''
  }
  get idUser(): string { //id del usuario
    return this.usuario._id || ''
  }
  crear_usuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
  }
  actualizar_perfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.role!
    }
    return this.http.put(`${base_url}/usuarios/${this.idUser}`, data, { headers: { 'token': this.token } })
  }
  eliminar_usuarios(id_usuario: string) {
    return this.http.delete(`${base_url}/usuarios/${id_usuario}`, { headers: { 'token': this.token } })
  }
  obtener_usuarios(desde: number = 0) {
    return this.http.get<{ total: number, usuarios: any }>(`${base_url}/usuarios?desde=${desde}`, { headers: { 'token': this.token } })
      .pipe(map(resp => {
        const usuarios = resp.usuarios.map(
          //creando nueva instancia de la clase 
          (user: Usuarios) => new Usuarios(user.nombre, user.email, '', user.img, user.google, user.role, user._id))
        return {
          total: resp.total,
          usuarios
        }
      }))
  }
  actualizar_usuarios( usuario: Usuarios) {
    return this.http.put(`${base_url}/usuarios/${usuario._id}`, usuario, { headers: { 'token': this.token } })
  }
  login(formData: any, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', formData.email)
    }
    else {
      localStorage.removeItem('email')
    }
    return this.http.post(`${base_url}/login`, formData).pipe(tap(
      (res: any) => {
        localStorage.setItem('token', res.token)
      }
    ))
  }
  loggin_google(token: any) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(tap(
      (res: any) => {
        localStorage.setItem('token', res.token)
      }
    ))
  }
  validar_token(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew_token`, { headers: { 'token': this.token } }).pipe(map(
      (res: any) => {

        localStorage.setItem('token', res.token)
        let decodeUser: any = jwt_decode(res.token)
        const { email, google, nombre, role, img, _id } = decodeUser
        this.usuario = new Usuarios(nombre, email, '', img, google, role, _id)
        return true
      }
    ), catchError(err => of(false)))
  }
  logout() {
    this.authService.signOut()
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')

  }


}
