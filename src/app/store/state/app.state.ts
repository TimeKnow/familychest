import {AuthState, initialAuthState} from './auth.state';
import {HttpErrorsState, initialHttpErrorsState} from './http-errors.state';
import {FamilyState, initialFamilyState} from './family.state';
import {FinancialState, initialFinancialState} from './financial.state';
import {ForumState, initialForumState} from './forum.state';

export interface AppState {
  authState: AuthState;
  familyState: FamilyState;
  financialState: FinancialState;
  forumState: ForumState;
  httpErrors: HttpErrorsState;
}

const initialAppState: AppState = {
  authState: initialAuthState,
  familyState: initialFamilyState,
  financialState: initialFinancialState,
  forumState: initialForumState,
  httpErrors: initialHttpErrorsState
};
