import {AuthUser} from '../../core/models/auth/auth-user.model';
import {UserNotification} from '../../core/models/auth/user-notification.model';

export interface AuthState {
  loading: boolean;
  loadingCurrentUser: boolean;
  currentUser: AuthUser;
  notification: UserNotification | null;
}

export const initialAuthState: AuthState = {
  loading: false,
  loadingCurrentUser: false,
  currentUser: null,
  notification: null
};

