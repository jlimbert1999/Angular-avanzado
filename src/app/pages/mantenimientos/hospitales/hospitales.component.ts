import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  cargando: boolean = false
  hospitales: Hospital[]
  hospitales_temporal: Hospital[]
  subscripcion_evento: Subscription
  constructor(private hospitalService: HospitalService,
    private busquedaService: BusquedasService, private modalImagenService: ModalImagenService) { }


  ngOnInit(): void {
    this.cargar_hospitales()
    this.subscripcion_evento = this.modalImagenService.evento_NuevaImagen.subscribe((info_evento: any) => {
      const foundIndex = this.hospitales.findIndex(hosp => hosp._id == info_evento.id);
      this.hospitales[foundIndex].img = info_evento.imagen
    })

  }
  ngOnDestroy(): void {
    this.subscripcion_evento.unsubscribe()
  }
  cargar_hospitales() {
    this.cargando = true
    this.hospitalService.obtener_hospitales().subscribe(hospitales => {
      this.hospitales = hospitales
      this.hospitales_temporal = hospitales
      this.cargando = false
    })
  }
  async agregar_hospital() {
    const { value } = await Swal.fire<string>({
      title: 'Registro hospital',
      input: 'text',
      inputLabel: 'Registro de un hospita',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true
    })
    if (value) {
      this.hospitalService.agregar_hospital(value).subscribe(resp => {
        this.hospitales.push(resp.hospital)
      })

    }
  }
  eliminar_hospital(hospital: Hospital) {
    this.hospitalService.eliminar_hospital(hospital._id!).subscribe(resp => {
      this.hospitales = this.hospitales.filter(hosp => hosp._id != hospital._id)
      this.hospitales_temporal = this.hospitales.filter(hosp => hosp._id != hospital._id)
    })
  }

  actualizar_hospital(hospital: Hospital) {
    this.hospitalService.actualizar_hospital(hospital._id!, hospital.nombre).subscribe(resp => {
      Swal.fire('Se actualizo', resp.message, 'success')
    }, error => console.log(error))

  }

  buscar_hospital(termino: string) {
    if (termino === '') {
      this.hospitales = this.hospitales_temporal
    }
    else {
      this.busquedaService.buscar('hospitales', termino).subscribe(data =>
        this.hospitales = data
      )
    }
  }
  abrir_modal_imagen(hospital: Hospital) {
    this.modalImagenService.abrir_modal('hospitales', hospital._id!, hospital.img)
  }


}
