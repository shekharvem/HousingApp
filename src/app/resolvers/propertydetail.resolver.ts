import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of  } from 'rxjs';
import { Property } from '../models/property';
import { PropertyListService } from '../services/property.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolver implements Resolve<Property> {
  constructor(private propertyList: PropertyListService, private router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property>|any {
    const propertyId = route.params['id']
    return this.propertyList.getProperty(+propertyId).pipe(
      catchError(error => {
        this.router.navigate(["/"])
        return of(null)
      })
    )
  }
}
