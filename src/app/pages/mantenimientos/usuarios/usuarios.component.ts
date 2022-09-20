import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuarios } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  total_usuarios: number = 0
  desde: number = 0
  usuarios: Usuarios[]
  usuariosTemp: Usuarios[]
  cargando: boolean = true

  subscripcion_evento: Subscription
  constructor(
    private userService: UsuariosService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }


  ngOnInit(): void {
    this.cargar_usuarios()
    this.subscripcion_evento = this.modalImagenService.evento_NuevaImagen.subscribe((info_evento: any) => {
      //evento se activara cuando se cambie imagen con modal
      const foundIndex = this.usuarios.findIndex(user => user._id == info_evento.id);
      this.usuarios[foundIndex].img = info_evento.imagen
    })
  }
  ngOnDestroy(): void {
    //cuando componenete se cierra, no es necesario que escuche el evento
    this.subscripcion_evento.unsubscribe()
  }
  cargar_usuarios() {
    this.cargando = true
    this.userService.obtener_usuarios(this.desde).subscribe(resp => {
      this.total_usuarios = resp.total
      this.usuarios = resp.usuarios
      this.usuariosTemp = resp.usuarios
      this.cargando = false
    })
  }
  cambiar_pagina(valor: number) {
    this.desde += valor
    if (this.desde < 0) {
      this.desde = 0
      return
    }
    else if (this.desde >= this.total_usuarios) {
      this.desde -= valor
      return
    }
    this.cargar_usuarios()
  }

  buscar(termino: string) {
    if (termino === '') {
      this.usuarios = this.usuariosTemp
    }
    else {
      this.busquedaService.buscar('usuarios', termino).subscribe((usuarios: Usuarios[]) => {
        this.usuarios = usuarios
      })
    }

  }
  eliminar(usuario: Usuarios) {
    if (usuario._id == this.userService.idUser) {
      Swal.fire(
        'No permitido',
        'No puede borrarse a si mismo ',
        'error'
      )
    }
    else {
      Swal.fire({
        title: 'Esta se seguro de elimiar?',
        text: `El usuario ${usuario.nombre} sera eliminado`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.eliminar_usuarios(usuario._id!).subscribe((resp: any) => {
            this.usuarios = this.usuarios.filter(user => user._id != usuario._id)
            this.usuariosTemp = this.usuariosTemp.filter(user => user._id != usuario._id)
            Swal.fire(
              'Eliminado!',
              `${resp.message}`,
              'success'
            )
          })

        }
      })

    }

  }
  cambiar_role(usuario: Usuarios) {
    this.userService.actualizar_usuarios(usuario).subscribe(
      res => { },
      error =>
        Swal.fire(
          'Error!',
          `${error.error.message}`,
          'error'
        ))
  }
  abrir_modal_image(usuario: Usuarios) {
    this.modalImagenService.abrir_modal('usuarios', usuario._id!, usuario.img)
  }



}
