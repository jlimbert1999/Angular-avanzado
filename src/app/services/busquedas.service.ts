import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuario.model';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }
  get token(): string {
    return localStorage.getItem('token') || ''
  }

  transformarUsuarios(data: any[]): Usuarios[] {
    // para crear instancia de usuarios obtenidos de busqueda como en getUsuarios del otro servicio
    return data.map(
      (user: any) => new Usuarios(user.nombre, user.email, '', user.img, user.google, user.role, user._id)
    )
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    return this.http.get<{ res: boolean, data: any[] }>(`${base_url}/todo/coleccion/${tipo}/${termino}`, { headers: { 'token': this.token } })
      .pipe(
        map(resp => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.data)
              break;

            default:
              break;
          }
          return []
        })
      )
  }
}
