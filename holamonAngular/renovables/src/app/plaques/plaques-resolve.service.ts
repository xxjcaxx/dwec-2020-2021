import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Placa } from './placa';
import { PlaquesService } from './plaques.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaquesResolveService implements Resolve<Placa> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Placa | Observable<Placa> | Promise<Placa>
  {
    return this.plaquesService.getPlaca(route.params.id).pipe(
      catchError(error => {this.router.navigate(['/plaques']);
      return of(null);
    })
    )
  }

  constructor( private plaquesService: PlaquesService, private router: Router ) { }
}
