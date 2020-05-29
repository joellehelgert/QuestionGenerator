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
import {AuthService} from '../../../services/auth/auth.service';
import {AuthState} from "../../../states/AuthState";
import {Store} from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  check() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (isAuthenticated) {
      return this.router.createUrlTree(['/questionnaire']);
    }
    return true;
  }
}
