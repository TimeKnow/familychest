import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpError, HttpErrorCleanup, HttpErrorsActionsTypes} from '../actions/http-errors.actions';
import {delay, map} from 'rxjs/operators';

const cleanupDelayTime = 7500;

@Injectable()
export class HttpErrorsEffects {
  constructor(
    private actions$: Actions
  ) {
  }

  @Effect()
  httpError$ = this.actions$.pipe(
    ofType<HttpError>(HttpErrorsActionsTypes.HttpError),
    delay(cleanupDelayTime),
    map(() => new HttpErrorCleanup())
  );
}
