import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('LoogedOutGuard CanActivate');
    return this.check();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('LoogedOutGuard CanActivate');
    return this.check();
  }

  check() {
    // checks if the user is logged in. If so go to the dashboard instead
    if (this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/questionnaire']);
    }

    // ... otherwise let the user pass
    return true;
  }
}
