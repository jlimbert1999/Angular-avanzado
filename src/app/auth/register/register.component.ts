import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Formulario_enviado = false
  registerForm = this.fb.group({
    nombre: ['Jose Limbert', [Validators.required, Validators.minLength(3)]],
    email: ['jose@gmail.com', [Validators.required, Validators.email]],
    password: ['122', Validators.required],
    password2: ['12444', Validators.required],
    terminos: [false, Validators.required]
  }, { validators: this.passwordsInguales('password', 'password2') })
  constructor(private fb: FormBuilder, private userService: UsuariosService) { }

  ngOnInit(): void {
  }
  crear_usuario() {
    this.Formulario_enviado = true
    if (this.registerForm.invalid) {
      return
    }
    this.userService.crear_usuario(this.registerForm.value).subscribe(resp => {
      console.log(resp);
    }, (err) => {
      Swal.fire('error', err.error.message, 'error')
    })
  }

  campoNovalido(campo: string) {
    if (this.registerForm.get(campo)?.invalid && this.Formulario_enviado) {
      return true
    }
    return false
  }
  passwordNoValidas() {
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value
    if (pass1 !== pass2 && this.Formulario_enviado) {
      return true
    }
    else {
      return false
    }
  }
  acepta_terminos() {
    return !this.registerForm.get('terminos')?.value && this.Formulario_enviado
  }

  passwordsInguales(pass1Name: string, pass2Name: string) {
    return (fromGroup: FormGroup) => {
      const pass1Control = fromGroup.get(pass1Name)
      const pass2Control = fromGroup.get(pass2Name)
      if (pass1Control?.value == pass2Control?.value) {
        pass2Control?.setErrors(null)
      }
      else {
        pass2Control?.setErrors({ noIguales: true })
      }
    }
  }

}
