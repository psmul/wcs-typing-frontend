import * as auth from './auth.reducers';
import {createFeatureSelector} from '@ngrx/store';


export interface AuthState {
  authState: auth.State;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');
