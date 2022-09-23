import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { SeccionBusquedasComponent } from './seccion-busquedas/seccion-busquedas.component';

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
      { path: 'perfil', component: PerfilComponent, data: { tituloRuta: 'Perfil' } },

      //matenimientos
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { tituloRuta: 'Administracion de usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { tituloRuta: 'Administracion de hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { tituloRuta: 'Administracion de medicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { tituloRuta: 'Medicos' } },

      //busquedas globales
      { path: 'buscar/:termino', component: SeccionBusquedasComponent, data: { tituloRuta: 'Busquedas' } },
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
