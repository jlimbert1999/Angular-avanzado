import { Component, } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  labels1: string[] = ['datos', 'porcentaje', 'calculos']
  labels2: string[] = ['sumas', 'restas', 'multiplicaciones']
  labels3: string[] = ['integrales', 'derivadas', 'graficas']
  labels4: string[] = ['metodos', 'hojas', 'otros']

  data1:number[]=[233, 400, 23]
  data2:number[]=[102, 23, 300]
  data3:number[]=[545, 423, 122]
  data4:number[]=[6, 454, 76]

}
