import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,  //rep una activatedroute d'un moment determinat per ser avaluada
    state: RouterStateSnapshot): // representa l'estar del router en un determinat moment
    Observable<boolean | UrlTree>
    | Promise<boolean| UrlTree>
    | boolean
    | UrlTree { // Pot retornar qualsevol d'aquestes coses.
      // Esta és la part que valida
      const id = route.params.id; // Trau de la ruta activa el id
      if(isNaN(id) || id < 1){
        console.log('La id no funciona')
        return this.router.parseUrl('/cataloge'); // retorna un URLTree amb el catàleg per tornar
      }
      return true; // true deixa eixir
  }

}
