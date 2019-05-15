import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {map, tap, switchMap} from 'rxjs/operators';
import {AuthService} from '../../../core/services/auth.service';
import {AuthActionTypes, SignUp, SignUpFailure, SignUpSuccess, LogIn, LogInSuccess, LogInFailure} from './auth.actions';
import {catchError} from 'rxjs/internal/operators/catchError';



@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}


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
          return of(new SignUpFailure({ error }));
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
          return of(new LogInFailure({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.authService.setAuthToken(user.payload.token.token);
      this.router.navigateByUrl('/dashboard');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      this.authService.removeAuthToken();
    })
  );
}
