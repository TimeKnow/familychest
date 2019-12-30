import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {HttpErrorsState} from '../state/http-errors.state';

const selectHttpErrorsState = (state: AppState) => state.httpErrors;

export const selectHttpErrorMessage = createSelector(
  selectHttpErrorsState,
  (state: HttpErrorsState) => state.errorMessage
);

export const selectHttpErrorStatus = createSelector(
  selectHttpErrorsState,
  (state: HttpErrorsState) => state.errorStatusCode
);
