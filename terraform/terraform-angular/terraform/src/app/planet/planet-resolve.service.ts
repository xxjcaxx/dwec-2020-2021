import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPlanet } from './i-planet';
import { PlanetService } from './planet.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetResolveService implements Resolve<IPlanet>{

  constructor(private planetService: PlanetService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  IPlanet | Observable<IPlanet> | Promise<IPlanet> 
  {
  //  console.log('resole');
    
    return this.planetService.getPlanet(route.params.id)
   /* .pipe(
      catchError(error => {this.router.navigate(['/planets']);
      return of(null);
    })
     );*/
  }
}
