import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  ocultarModal: boolean = true
  tipo: string
  id: string
  imgURL?: string

  //emitir un evento que sera escuchado para actualizar una imagen en las tablas
  evento_NuevaImagen: EventEmitter<object> = new EventEmitter()


  constructor() {
  }

  abrir_modal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img?: string) {
    this.ocultarModal = false
    this.tipo = tipo
    this.id = id
    if (img?.includes('https')) {
      return this.imgURL = img
    }
    if (img) {
      return this.imgURL = `${base_url}/uploads/${tipo}/${img}`
    }
    else {
      return this.imgURL = `${base_url}/uploads/${tipo}/no-img`
    }
  }
  cerrar_modal() {
    this.ocultarModal = true
  }

}
