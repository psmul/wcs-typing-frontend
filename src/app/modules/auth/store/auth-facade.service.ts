import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from './auth.state';
import {LogIn, SignUp} from './auth.actions';
import {Observable} from 'rxjs';
import {selectAuthErrorMessage} from './auth.selectors';


@Injectable()
export class AuthFacadeService {

  constructor(private store: Store<AuthState>) {}

  getAuthErrorMessage(): Observable<string> {
    return this.store.select(selectAuthErrorMessage);
  }

  logIn(payload: { username: string, password: string }): void {
    this.store.dispatch(new LogIn(payload));
  }

  signUp(payload: { username: string, password: string }): void {
    this.store.dispatch(new SignUp(payload));
  }

}
