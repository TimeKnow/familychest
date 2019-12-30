import {Action} from '@ngrx/store';
import {EmailCredential} from '../../core/models/auth/email-credential';
import {AuthUser} from '../../core/models/auth/auth-user.model';
import {RegistrationCredential} from '../../core/models/auth/registration-credential';
import {UserNotification} from '../../core/models/auth/user-notification.model';

export enum AuthActionsTypes {
  GetCurrentUser = '[Auth-User] Get Current',
  GetCurrentUserSuccess = '[Auth-User] Get Current Success',
  LoginUser = '[Auth-User] Login',
  LoginUserSuccess = '[Auth-User] Login Success',
  LoginUserFailure = '[Auth-User] Login Failure',
  LoginRedirect = '[Auth-User] LoginRedirect',
  LogoutUser = '[Auth-User] Logout',
  RegisterUser = '[Auth-User] Register',
  RegisterUserSuccess = '[Auth-User] Register Success',
  GetNotification = '[Auth-User] Get Notification',
  GetNotificationSuccess = '[Auth-User] Get Notification Success',
  RemoveNotification = '[Auth-User] Remove Notification',
  RemoveNotificationSuccess = '[Auth-User] Remove Notification Success'
}

export class GetCurrentUser implements Action {
  public readonly type = AuthActionsTypes.GetCurrentUser;

  constructor(public payload: boolean) {
  }
}

export class GetCurrentUserSuccess implements Action {
  public readonly type = AuthActionsTypes.GetCurrentUserSuccess;

  constructor(public payload: AuthUser) {
  }
}

export class LoginUser implements Action {
  public readonly type = AuthActionsTypes.LoginUser;

  constructor(public payload: EmailCredential) {
  }
}

export class LoginUserFailure implements Action {
  public readonly type = AuthActionsTypes.LoginUserFailure;

  constructor(public payload: any) {
  }
}

export class LoginUserSuccess implements Action {
  public readonly type = AuthActionsTypes.LoginUserSuccess;

  constructor(public payload: any) {
  }
}

export class LoginRedirect implements Action {
  public readonly type = AuthActionsTypes.LoginRedirect;

  constructor(public payload: boolean) {
  }
}

export class LogoutUser implements Action {
  public readonly type = AuthActionsTypes.LogoutUser;
}

export class RegisterUser implements Action {
  public readonly type = AuthActionsTypes.RegisterUser;

  constructor(public payload: RegistrationCredential) {
  }
}

export class RegisterUserSuccess implements Action {
  public readonly type = AuthActionsTypes.RegisterUserSuccess;

  constructor(public payload: string) {
  }
}

export class GetNotification implements Action {
  public readonly type = AuthActionsTypes.GetNotification;
}

export class GetNotificationSuccess implements Action {
  public readonly type = AuthActionsTypes.GetNotificationSuccess;

  constructor(public payload: UserNotification) {
  }
}

export class RemoveNotification implements Action {
  public readonly type = AuthActionsTypes.RemoveNotification;
}

export class RemoveNotificationSuccess implements Action {
  public readonly type = AuthActionsTypes.RemoveNotificationSuccess;
}

export type AuthActions =
  LoginUser
  | LoginUserSuccess
  | LoginUserFailure
  | LoginRedirect
  | LogoutUser
  | GetCurrentUserSuccess
  | GetCurrentUser
  | RegisterUser
  | RegisterUserSuccess
  | GetNotification
  | GetNotificationSuccess
  | RemoveNotification
  | RemoveNotificationSuccess;
