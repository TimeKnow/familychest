import {HttpErrorsState, initialHttpErrorsState} from '../state/http-errors.state';
import {HttpErrorsActions, HttpErrorsActionsTypes} from '../actions/http-errors.actions';

export function httpErrorsReducer(state: HttpErrorsState = initialHttpErrorsState, action: HttpErrorsActions) {
  switch (action.type) {
    case HttpErrorsActionsTypes.HttpError:
      return {
        ...state,
        errorMessage: action.payload.message,
        errorStatusCode: action.payload.statusCode
      };
    case HttpErrorsActionsTypes.HttpErrorCleanup:
      return {
        ...initialHttpErrorsState
      };
    default:
      return state;
  }
}
