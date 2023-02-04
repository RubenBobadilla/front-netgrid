import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {  }

  /**
   * Valida  si el Token expiró
   * @returns :Boolean
   */
  canActivate(){
    let res = true;
    if(!this.authService.isAuth()){
      console.log('Token no Válido o ya expiró');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      alert('Token no Válido o ya expiró');
      this.router.navigate(['login']);
      res = false;
    }
   return res;
  }


  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
  
}
