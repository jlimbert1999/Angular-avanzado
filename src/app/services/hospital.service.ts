import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  obtener_hospitales() {
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(`${base_url}/hospitales`, { headers: { 'token': this.token } })
      .pipe(map(resp => {
        return resp.hospitales
      }))
  }
  agregar_hospital(nombre: string) {
    return this.http.post<{ ok: boolean, hospital: Hospital }>(`${base_url}/hospitales`, { nombre }, { headers: { 'token': this.token } })

  }
  actualizar_hospital(id: string, nombre: string) {
    return this.http.put<{ ok: boolean, hospital: Hospital, message: string }>(`${base_url}/hospitales/${id}`, { nombre }, { headers: { 'token': this.token } })
  }
  eliminar_hospital(id: string) {
    return this.http.delete<{ ok: boolean, message: string }>(`${base_url}/hospitales/${id}`, { headers: { 'token': this.token } })
  }


  get token(): string {
    return localStorage.getItem('token') || ''
  }
}
