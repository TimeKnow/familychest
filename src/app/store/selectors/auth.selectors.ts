import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {AuthState} from '../state/auth.state';

const selectAuthState = (state: AppState) => state.authState;

export const selectCurrentAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser
);

export const selectCurrentAuthUserIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loadingCurrentUser
);

export const selectLoginIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectCurrentUserNotifications = createSelector(
  selectAuthState,
  (state: AuthState) => state.notification
);
