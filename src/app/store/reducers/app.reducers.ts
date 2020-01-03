import {AppState} from '../state/app.state';
import {ActionReducerMap} from '@ngrx/store';
import {authReducers} from './auth.reducers';
import {httpErrorsReducer} from './http-errors.reducers';
import {familyReducers} from './family.reducers';
import {financialReducers} from './financial.reducers';
import {forumReducers} from './forum.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  httpErrors: httpErrorsReducer,
  authState: authReducers,
  familyState: familyReducers,
  financialState: financialReducers,
  forumState: forumReducers
};
