import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email_recordatorio = ''
  Formulario_enviado = false
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })
  user: SocialUser;
  loggedIn: boolean;
  constructor(private router: Router, private authService: SocialAuthService, private fb: FormBuilder, private userService: UsuariosService) { }
  
  ngOnInit(): void {
    this.email_recordatorio = localStorage.getItem('email') || ''
    if (this.email_recordatorio.length > 0) {
      this.loginForm.controls['remember'].setValue(true)
      this.loginForm.controls['email'].setValue(this.email_recordatorio)
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.userService.loggin_google(this.user.idToken).subscribe(resp => {
          this.router.navigateByUrl('/')
        })
      }
    }
    );



  }
  login() {
    if (this.loginForm.invalid) {
      return
    }
    this.userService.login(this.loginForm.value!, this.loginForm.get('remember')?.value!).subscribe((resp: boolean) => {
      this.router.navigateByUrl('/')
    }, (err) => {
      Swal.fire('error', err.error.message, 'error')
    })
  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }






}
