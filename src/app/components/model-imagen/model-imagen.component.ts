import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styles: [


  ]
})
export class ModelImagenComponent implements OnInit {
  archivoSubir: File
  imagenTemporal: any
  constructor(public modalImagenService: ModalImagenService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  ocultar_modal() {
    this.imagenTemporal = null
    this.modalImagenService.cerrar_modal()
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
  subir_imagen() {
    //al abrir imagen con servicio, la info de carga ahi. En modal service
    const tipo = this.modalImagenService.tipo
    const id = this.modalImagenService.id
    this.fileUploadService.actualizarFoto(this.archivoSubir, tipo, id).subscribe((resp: any) => {
      this.ocultar_modal()
      const info_emitir: any = {
        imagen: resp.nombre_imagen,
        id
      }
      this.modalImagenService.evento_NuevaImagen.emit(info_emitir)
      Swal.fire(
        'Cambios guardados',
        "Se actualizo la imagen",
        'success'
      )
    }, error => {
      console.log('erro al subir imagen', error);
    })
  }



}
