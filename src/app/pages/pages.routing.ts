import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    //componente donde se rendirizan los otros
    path: 'dashboard', component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { tituloRuta: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { tituloRuta: 'ProgressBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { tituloRuta: 'Grafica' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { tituloRuta: 'Ajustes cuenta' } },
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
