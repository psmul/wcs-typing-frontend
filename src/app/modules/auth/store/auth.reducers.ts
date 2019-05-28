import {AuthActionsAll, AuthActionTypes} from './auth.actions';
import {AuthState, initialState} from './auth.state';




export function authReducerFn(state = initialState, action: AuthActionsAll): AuthState {
  switch (action.type) {
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error.error.message || action.payload.error.message
      };
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error.error.message
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export function authReducer(state = initialState, action: AuthActionsAll): AuthState {
  return authReducerFn(state, action);
}
