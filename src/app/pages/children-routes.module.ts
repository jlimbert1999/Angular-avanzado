import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AdminGuard } from '../guards/admin.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { SeccionBusquedasComponent } from './seccion-busquedas/seccion-busquedas.component';


//implemetacion del lazy load
const ChildRoutes: Routes = [
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

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ChildRoutes)
  ],
  exports: [RouterModule]
})
export class ChildrenRoutesModule { }
