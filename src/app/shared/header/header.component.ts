import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public User_detalis: Usuarios
  constructor(private userService: UsuariosService, private router: Router) {
    this.User_detalis = userService.usuario
  }

  ngOnInit(): void {

  }
  cerrar_sesion() {
    this.userService.logout()
  }
  buscar(termino: string) {
    if (termino.length == 0) {
      return
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }

}
