import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild, CanLoad, UrlSegment, Route
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild, CanLoad{
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canAcrivate');
    return this.isLoggedIn();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canAcrivateChild');
    return this.isLoggedIn();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // everything is fine. Start loading the module...
    return true;
  }
  isLoggedIn() {
    // checks if the user is not logged in. If so, the user will be redirected to the login page
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }
}
