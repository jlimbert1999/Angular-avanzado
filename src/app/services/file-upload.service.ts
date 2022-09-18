import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  actualizarFoto(archivo: File, tipo: string, id: string) {
    const formData: FormData = new FormData();
    formData.append("imagen", archivo);
    return this.http.put(`${base_url}/uploads/${tipo}/${id}`, formData)
  }

  async actualizarFoto_version2(archivo: File, tipo: string, id: string) {
    //segunda forma de hacer con fetch
    try {
      const url = `${base_url}/uploads/${tipo}/${id}`
      const formData: FormData = new FormData();
      formData.append("imagen", archivo);
      const respuesta = await fetch(url, {
        method: 'PUT',
        headers: { 'token': localStorage.getItem('token') || '' },
        body: formData
      })
      const data = await respuesta.json()
      return data
    } catch (error) {
      console.log('error al subir imagen', error);
    }
  }

}
