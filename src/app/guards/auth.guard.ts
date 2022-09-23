import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
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
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.validar_token().pipe(tap(estaAuntenticado => {
      if (!estaAuntenticado) {
        
        this.router.navigateByUrl('/login')
      }
    }));
  }

}
