import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap, timeout} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AuthActionsTypes,
  GetCurrentUser,
  GetCurrentUserSuccess, GetNotification, GetNotificationSuccess,
  LoginRedirect,
  LoginUser,
  LoginUserFailure,
  LoginUserSuccess, LogoutUser, RegisterUser, RegisterUserSuccess, RemoveNotification, RemoveNotificationSuccess
} from '../actions/auth.actions';
import {HttpError} from '../actions/http-errors.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {
  }

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType<LoginUser>(AuthActionsTypes.LoginUser),
    map(action => action.payload),
    switchMap(credential => this.authService.login(credential).pipe(
      timeout(5000),
      map(user => new LoginUserSuccess(user)),
      catchError(error => of(new LoginUserFailure(error)))
    ))
  );

  @Effect()
  loginUserSuccess$ = this.actions$.pipe(
    ofType<LoginUserSuccess>(AuthActionsTypes.LoginUserSuccess),
    tap(() => this.router.navigateByUrl('/home')),
    switchMap(() => of(new GetCurrentUser(false)))
  );

  @Effect()
  loginUserFailure$ = this.actions$.pipe(
    ofType<LoginUserFailure>(AuthActionsTypes.LoginUserFailure),
    map(action => action.payload),
    switchMap((response: any) => [new HttpError({statusCode: response.status, message: response.error.message}), new LoginRedirect(true)])
  );

  @Effect()
  getCurrentUser$ = this.actions$.pipe(
    ofType<GetCurrentUser>(AuthActionsTypes.GetCurrentUser),
    map(action => action.payload),
    switchMap(willRefresh => this.authService.getCurrentUser().pipe(
      timeout(3000),
      map(user => new GetCurrentUserSuccess(user)),
      catchError(() => of(new LoginRedirect(willRefresh)))
    ))
  );

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginRedirect>(AuthActionsTypes.LoginRedirect),
    map(action => action.payload),
    tap(willRefresh => {
      if (willRefresh) {
        this.router.navigateByUrl('/login');
      }
    })
  );


  @Effect({dispatch: false})
  logoutUser$ = this.actions$.pipe(
    ofType<LogoutUser>(AuthActionsTypes.LogoutUser),
    tap(() => this.authService.logout().subscribe(() => this.router.navigateByUrl('/login')
    ))
  );

  @Effect()
  registerUser$ = this.actions$.pipe(
    ofType<RegisterUser>(AuthActionsTypes.RegisterUser),
    map(action => action.payload),
    switchMap(registrationCredential => this.authService.register(registrationCredential).pipe(
      timeout(3000),
      map(response => new RegisterUserSuccess(response)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect({dispatch: false})
  registerUserSuccess$ = this.actions$.pipe(
    ofType<RegisterUserSuccess>(AuthActionsTypes.RegisterUserSuccess),
    tap(() => this.router.navigateByUrl('/login'))
  );

  @Effect()
  getNotification$ = this.actions$.pipe(
    ofType<GetNotification>(AuthActionsTypes.GetNotification),
    switchMap(() => this.authService.getNotification().pipe(
      map(notification => new GetNotificationSuccess(notification)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  removeNotification$ = this.actions$.pipe(
    ofType<RemoveNotification>(AuthActionsTypes.RemoveNotification),
    switchMap(() => this.authService.removeNotification().pipe(
      map(() => new RemoveNotificationSuccess()),
      catchError(error => of(new HttpError(error)))
    ))
  );
}
