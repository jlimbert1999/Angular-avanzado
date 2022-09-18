import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuIntems: any[]
  public User_detalis: Usuarios
  constructor(private sidebarService: SidebarService, private userService: UsuariosService) {
    this.menuIntems = this.sidebarService.menu
    this.User_detalis = userService.usuario
  }

  ngOnInit(): void {
  }

}
