import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medicos } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  medicoForm: FormGroup
  hospitales: Hospital[]
  medicoSeleccionado: Medicos
  hospitalSeleccionado: Hospital
  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private acivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    })
    this.obtener_hospitales()
    this.acivatedRoute.params.subscribe((parametros_ruta: any) => {
      //escuchar cambios en la ruta, cuando se crea medico la ruta cambiara
      if (parametros_ruta.id !== 'nuevo') {
        this.obtener_medico(parametros_ruta.id)
        
      }
    })

    // otra forma de escuchar envento al seleccionar un hospital
    // this.medicoForm.get('hospital')!.valueChanges.subscribe(hospitalID => {
    //   this.hospitalSeleccionado = this.hospitales.find(h => h._id == hospitalID)!
    // })
  }
  guardar_medico() {
    if (this.medicoSeleccionado) {
      this.actualizar_medico()
    }
    else {
      //crear medico
      this.medicoService.agregar_medico(this.medicoForm.value).subscribe(medico => {
        this.medicoSeleccionado = medico
        this.router.navigateByUrl(`/dashboard/medico/${medico._id}`)
      })

    }

  }
  obtener_hospitales() {
    this.hospitalService.obtener_hospitales().subscribe(hospitales => this.hospitales = hospitales)
  }
  seleccionar_hospital(valor: any) {
    this.hospitalSeleccionado = this.hospitales.find(h => h._id == valor.target.value)!
  }
  actualizar_medico() {
    this.medicoService.editar_medicos(this.medicoSeleccionado._id!, this.medicoForm.value).subscribe(resp => {
      Swal.fire('Actualizacion correcta', 'Se actualizo el medico', 'success')
     
    })
  }
  obtener_medico(id: string) {
    this.medicoService.obtener_medico(id).subscribe(medico => {
      this.medicoSeleccionado = medico
      this.hospitalSeleccionado = medico.hospital;
      this.medicoForm.get('nombre')?.setValue(medico.nombre)
      this.medicoForm.get('hospital')?.setValue(medico.hospital._id)


    }, error=>{
      //error cuando id no existe o no es id de mongo
      this.router.navigateByUrl(`/dashboard/medicos`)
    })
  }



}
