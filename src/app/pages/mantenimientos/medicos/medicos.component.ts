import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medicos } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  cargando: boolean = false
  medicos: Medicos[]
  medicos_temp: Medicos[]
  subscripcion_evento: Subscription
  constructor(private medicosService: MedicoService,
    private busquedaService: BusquedasService, private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.obtener_medicos()
    this.subscripcion_evento = this.modalImagenService.evento_NuevaImagen.subscribe((info_evento: any) => {
      const foundIndex = this.medicos.findIndex(medic => medic._id == info_evento.id);
      this.medicos[foundIndex].img = info_evento.imagen
    })
  }
  ngOnDestroy(): void {
    this.subscripcion_evento.unsubscribe()
  }

  obtener_medicos() {
    this.cargando = true
    this.medicosService.obtener_medicos().subscribe(medicos => {
      this.medicos = medicos
      this.medicos_temp = medicos
      this.cargando = false
    })
  }
  buscar_medico(termino: string) {
    if (termino === '') {
      this.medicos = this.medicos_temp
    }
    else {
      this.busquedaService.buscar('medicos', termino).subscribe(medicos => {
        this.medicos = medicos
      })
    }

  }
  abrir_modal_imagen(medico: Medicos) {
    this.modalImagenService.abrir_modal('medicos', medico._id!, medico.img)
  }
  eliminar_medico(medico: Medicos) {

    Swal.fire({
      title: 'Esta se seguro de eliminar?',
      text: `El medico ${medico.nombre} sera eliminado`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.eliminar_medico(medico._id!).subscribe(resp => {
          this.medicos = this.medicos.filter(medic => medic._id != medico._id)
          this.medicos_temp = this.medicos_temp.filter(medic => medic._id != medico._id)
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
