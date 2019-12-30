import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {
  selectCurrentAuthUser,
  selectCurrentAuthUserIsLoading,
  selectCurrentUserNotifications
} from '../../../store/selectors/auth.selectors';
import {Observable} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {AuthUserRolesDict} from '../../../core/models/auth/auth-user-roles';
import {GetNotification, RemoveNotification} from '../../../store/actions/auth.actions';
import {UserNotification} from '../../../core/models/auth/user-notification.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  notification$: Observable<UserNotification>;
  roles = AuthUserRolesDict;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetNotification());
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.notification$ = this.store.select(selectCurrentUserNotifications);
  }


  onNotificationRemove() {
    this.store.dispatch(new RemoveNotification());
  }
}
