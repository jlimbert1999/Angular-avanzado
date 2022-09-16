import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.userService.validar_token().pipe(tap(estaAuntenticado => {
      if (!estaAuntenticado) {
        this.router.navigateByUrl('/login')
      }
    }));

  }
  constructor(private userService: UsuariosService, private router: Router) {


  }

}
