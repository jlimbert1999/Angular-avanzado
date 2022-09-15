import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login.interface';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { map } from 'rxjs';
const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  crear_usuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
  }
  login(formData: loginForm, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', formData.email)
    }
    else {
      localStorage.removeItem('email')
    }
    return this.http.post(`${base_url}/login`, formData).pipe(map(
      (res: any) => {
        localStorage.setItem('token', res.token)
        return true
      }
    ))
  }
  signInWithGoogle(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((result) => {
    //   console.log(result);
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
}
