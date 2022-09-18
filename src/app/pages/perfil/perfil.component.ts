import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup
  usuario: Usuarios
  archivoSubir: File
  imagenTemporal: any

  constructor(private fb: FormBuilder, private userService: UsuariosService, private fileUplodad: FileUploadService) {
    this.usuario = userService.usuario
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizar_perfil() {
    this.userService.actualizar_usuario(this.perfilForm.value).subscribe(resp => {
      const { email, nombre } = this.perfilForm.value
      this.usuario.nombre = nombre
      this.usuario.email = email
      Swal.fire(
        'Cambios guardados',
        "Se actualizo el perfil",
        'success'
      )
    }, error => {
      Swal.fire(
        'No se pudo actualizar el perfil',
        error.error.message,
        'error'
      )
    })

  }
  cambiar_imagen(file: any) {
    this.archivoSubir = file.target.files[0]
    if (!file) {
      this.imagenTemporal = null
    }
    else {
      const reader = new FileReader()
      reader.readAsDataURL(file.target.files[0]);
      reader.onloadend = () => {
        this.imagenTemporal = reader.result
      }
    }
  }

  actualizar_imagen() {
    this.fileUplodad.actualizarFoto(this.archivoSubir, 'usuarios', this.usuario._id!).subscribe((resp: any) => {
      this.usuario.img = resp.nombre_imagen
      Swal.fire(
        'Cambios guardados',
        "Se actualizo la imagen del perfil",
        'success'
      )
    }, error => {
      console.log('erro al subir imagen', error);
    })
  }

}
