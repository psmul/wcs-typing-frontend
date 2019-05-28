import * as auth from './auth.reducers';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AuthState} from './auth.state';



export const selectAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector('auth');

export const selectAuthErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.errorMessage
);
