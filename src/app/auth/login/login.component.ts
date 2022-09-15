import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'
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

  constructor(private router: Router, private fb: FormBuilder, private userService: UsuariosService) { }

  ngOnInit(): void {
    this.email_recordatorio = localStorage.getItem('email') || ''
    if (this.email_recordatorio.length > 0) {
      this.loginForm.controls['remember'].setValue(true)
      this.loginForm.controls['email'].setValue(this.email_recordatorio)
    }

  }
  login() {
    if (this.loginForm.invalid) {
      return
    }
    this.userService.login(this.loginForm.value, this.loginForm.get('remember')?.value).subscribe((resp: boolean) => {
      console.log(resp);
    }, (err) => {
      Swal.fire('error', err.error.message, 'error')
    })

  }
  login_Google(){
    this.userService.signInWithGoogle()
  }


}
