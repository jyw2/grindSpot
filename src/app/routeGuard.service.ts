
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CentralData } from "./centralizedData.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  //guards login only pages

  constructor( private data:CentralData, private route: Router){

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): UrlTree | boolean{
      //redirecting to login if not logged in
      if(!this.data.getLoginState()){
        //not logged in
          return this.route.createUrlTree(['/login'])
      }else{
        //logged in, continue
        return true
      }
  }
}
