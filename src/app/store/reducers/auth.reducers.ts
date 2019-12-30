import {AuthState, initialAuthState} from '../state/auth.state';
import {AuthActions, AuthActionsTypes} from '../actions/auth.actions';

export function authReducers(state: AuthState = initialAuthState, action: AuthActions) {
  switch (action.type) {
    case AuthActionsTypes.LoginUser:
      return {
        ...state,
        loading: true,
      };
    case AuthActionsTypes.LoginUserSuccess:
      return {
        ...state,
        loading: false
      };
    case AuthActionsTypes.LoginUserFailure:
      return {
        ...state,
        loading: false
      };
    case AuthActionsTypes.GetCurrentUserSuccess:
      return {
        ...state,
        loadingCurrentUser: false,
        currentUser: action.payload
      };
    case AuthActionsTypes.LogoutUser:
      return {
        ...state,
        currentUser: null
      };
    case AuthActionsTypes.RegisterUser:
      return {
        ...state,
        loading: true
      };
    case AuthActionsTypes.RegisterUserSuccess:
      return {
        ...state,
        loading: false
      };
    case AuthActionsTypes.GetNotification:
      return {
        ...state,
        loading: true
      };
    case AuthActionsTypes.GetNotificationSuccess:
      return {
        ...state,
        loading: false,
        notification: action.payload
      };
    case AuthActionsTypes.RemoveNotificationSuccess:
      return {
        ...state,
        notification: null
      };
    default:
      return state;
  }
}
