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
import {AuthService} from '../../../services/auth/auth.service';
import {Store} from "@ngxs/store";
import {AuthState} from "../../../states/AuthState";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild, CanLoad{
  constructor(private authService: AuthService, private router: Router, private store: Store) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isLoggedIn() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
      return this.router.createUrlTree(['/login']);
    }
    return true;
  }
}
