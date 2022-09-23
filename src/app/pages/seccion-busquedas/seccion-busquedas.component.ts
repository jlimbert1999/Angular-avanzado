import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medicos } from 'src/app/models/medico.model';
import { Usuarios } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-seccion-busquedas',
  templateUrl: './seccion-busquedas.component.html',
  styles: [
  ]
})
export class SeccionBusquedasComponent implements OnInit {
  usuarios: Usuarios[] = []
  medicos: Medicos[]=[]
  hospitales: Hospital[]=[]
  constructor(private activatedRouter: ActivatedRoute, private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(parametros => {
      this.busquedasService.buscar_global(parametros['termino']).subscribe(resp => {
        this.usuarios = resp.usuarios
        this.medicos = resp.medicos
        this.hospitales = resp.hospitales
      })
    })
  }

}
