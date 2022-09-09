import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']

})
export class ProgressComponent implements OnInit {
  progreso1: number = 25
  progreso2: number = 35
  constructor() { }

  ngOnInit(): void {
  }
  get getporcentaje1() {
    return `${this.progreso1}%`;
  }
  get getporcentaje2() {
    return `${this.progreso2}%`;
  }
  cambio_valorHijo(valor: number) {
    this.progreso1 = valor
  }

}
