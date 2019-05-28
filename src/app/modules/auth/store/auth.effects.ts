import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../../core/services/auth.service';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess, SignUp, SignUpFailure, SignUpSuccess} from './auth.actions';
import {catchError} from 'rxjs/internal/operators/catchError';


@Injectable()
export class AuthEffects {

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload).pipe(
        map((user) => {
          console.log(user);
          return new SignUpSuccess({token: user.token, username: payload.username});
        }),
        catchError((error) => {
          console.log(error);
          return of(new SignUpFailure({error}));
        })
      );
    })
  );

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload).pipe(
        map((user) => {
          console.log(user);
          return new LogInSuccess({token: user.token, username: payload.username});
        }),
        catchError((error) => {
          console.log(error);
          return of(new LogInFailure({error}));
        })
      );
    })
  );

  @Effect({dispatch: false})
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.authService.setAuthToken(user.payload.token.token);
      this.router.navigateByUrl('/dashboard');
    })
  );

  @Effect({dispatch: false})
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({dispatch: false})
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      this.authService.removeAuthToken();
    })
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }
}
