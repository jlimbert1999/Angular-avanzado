import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private router: Router, private authService: SocialAuthService) { }
  crear_usuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
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
    const token = localStorage.getItem('token') || ''
    return this.http.get(`${base_url}/login/verify_token`, { headers: { 'token': token } }).pipe(map(
      (res: any) => true
    ), catchError(err => of(false)))
  }

  logout() {
    this.authService.signOut()
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')

  }


}
