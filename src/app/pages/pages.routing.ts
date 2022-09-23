import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    //componente donde se rendirizan los otros
    path: 'dashboard', component: PagesComponent,
    canActivate: [AuthGuard],
    //ver si se cargara para lazy loads
    canLoad: [AuthGuard],
    loadChildren: () => import('./children-routes.module').then(m => m.ChildrenRoutesModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
