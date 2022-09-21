import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicos } from '../models/medico.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }
  obtener_medicos() {
    return this.http.get<{ ok: boolean, medicos: Medicos[] }>(`${base_url}/medicos`, { headers: { 'token': this.token } })
      .pipe(map(resp => {
        return resp.medicos
      }))
  }
  obtener_medico(id_medico: string) {
    return this.http.get<{ ok: boolean, medico: Medicos }>(`${base_url}/medicos/${id_medico}`, { headers: { 'token': this.token } })
      .pipe(map(resp => {
        return resp.medico
      }))
  }
  agregar_medico(data: { nombre: string, hospita: string }) {
    return this.http.post<{ ok: boolean, medico: Medicos }>(`${base_url}/medicos`, data, { headers: { 'token': this.token } }).
      pipe(map(resp => {
        return resp.medico
      }))

  }
  editar_medicos(id_medico: string, data: { nombre: string, hospita: string }) {
    return this.http.put<{ ok: boolean, medico: Medicos }>(`${base_url}/medicos/${id_medico}`, data, { headers: { 'token': this.token } })
      .pipe(map(resp => {
        return resp.medico
      }))
  }
  eliminar_medico(id: string) {
    return this.http.delete<{ ok: boolean, message: string }>(`${base_url}/medicos/${id}`, { headers: { 'token': this.token } })
  }




  get token(): string {
    return localStorage.getItem('token') || ''
  }

}
