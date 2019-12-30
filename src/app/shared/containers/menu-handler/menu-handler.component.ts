import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {AppState} from '../../../store/state/app.state';
import {Store} from '@ngrx/store';
import {GetCurrentUser, LogoutUser} from '../../../store/actions/auth.actions';
import {selectCurrentAuthUser} from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-menu-handler',
  templateUrl: './menu-handler.component.html',
  styleUrls: ['./menu-handler.component.css']
})
export class MenuHandlerComponent implements OnInit {
  currentUser$: Observable<AuthUser>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCurrentUser(true));
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
  }

  onLogout() {
    this.store.dispatch(new LogoutUser());
  }
}
