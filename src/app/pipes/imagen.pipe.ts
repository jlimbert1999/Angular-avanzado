import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: 'hospitales' | 'usuarios' | 'medicos'): unknown {
    if (!imagen) {
      return `${base_url}/uploads/${tipo}/no-img`
    }
    else if (imagen.includes('https')) {
      return imagen
    }
    else {
      return `${base_url}/uploads/${tipo}/${imagen}`
    }


  }

}
