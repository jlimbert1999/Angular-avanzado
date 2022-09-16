import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UsuariosService) { }

  ngOnInit(): void {
  }
  cerrar_sesion() {
    this.userService.logout()
  }

}
