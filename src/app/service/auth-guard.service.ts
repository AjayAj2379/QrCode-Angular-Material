import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from './auth-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService : AuthServiceService,
    private route : Router
  ) { }

  canActivate(route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean
    {
      console.log('canactivate')

      return this.authService.isAuthenticated().then((data:any)=>{
        console.log(data)
        return true;
      }).catch((error)=>{
        console.log(error)
        this.route.navigate(['/']);
        return false;
      })

    }


}
