import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard', icon: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          url: '/'
        },
        {
          titulo: 'Progressbar',
          url: 'progress'
        },
        {
          titulo: 'Grafica',
          url: 'grafica1'
        },
      ]
    },
    {
      title: 'Mantenimientos', icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios'
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales'
        },
        {
          titulo: 'Medicos',
          url: 'medicos'
        },
      ]
    },

  ]

  constructor() { }
}
