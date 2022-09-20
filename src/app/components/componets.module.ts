import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { NgChartsModule } from 'ng2-charts';
import { ModelImagenComponent } from './model-imagen/model-imagen.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficaDonaComponent,
    ModelImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    GraficaDonaComponent,
    ModelImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponetsModule { }
