import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {tap} from "rxjs/operators";
import {AddError} from "./HintState";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";

export interface AuthStateModel {
  token: string | null;
  email: string | null;
}

export interface LoginObject {
  email: string;
  password: string;
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginObject) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    email: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService,
              private router: Router,
              public store: Store,
              private auth: AngularFireAuth,
              ) { }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    console.log(action.payload.email);
    this.auth.signInWithEmailAndPassword(
      action.payload.email, action.payload.password).then(
      (success) => {
        this.router.navigate(['/questionnaire']);
      }).catch((error) => {
      this.store.dispatch(new AddError({statusCode: 400, message: 'There is no user with this email address'}));
    });
    return this.authService.login(action.payload.email, action.payload.password).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
          email: action.payload.email
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });

    const state = ctx.getState();
    return this.authService.logout(state.token).pipe(
      tap(() => {
        ctx.setState({
          token: null,
          email: null
        });
      })
    );
  }
}
