import {Action} from '@ngrx/store';
import {HttpErrorMessage} from '../../core/models/http-error-message.model';

export enum HttpErrorsActionsTypes {
  HttpError = '[App-Effects] Register HTTP Error',
  HttpErrorCleanup = '[App-Effects] HTTP Error Cleanup',
}

export class HttpError implements Action {
  public readonly type = HttpErrorsActionsTypes.HttpError;

  constructor(public payload: HttpErrorMessage) {
  }
}

export class HttpErrorCleanup implements Action {
  public readonly type = HttpErrorsActionsTypes.HttpErrorCleanup;
}

export type HttpErrorsActions = HttpError | HttpErrorCleanup;
