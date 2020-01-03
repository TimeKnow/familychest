import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {
  selectCurrentSelectedFamily,
  selectFamilyStateChildRequests,
  selectFamilyStateIsLoading
} from '../../../store/selectors/family.selectors';
import {ChildRequest} from '../../../core/models/family/child-request.model';
import {ChildRequestAction} from '../../../core/models/family/child-request-action';
import {Family} from '../../../core/models/family/family.model';
import {ChangeFamilyChildRequestStatus} from '../../../store/actions/family.actions';
import {AuthUser} from '../../../core/models/auth/auth-user.model';

@Component({
  selector: 'app-child-requests-dashboard-page',
  templateUrl: './child-requests-dashboard-page.component.html',
  styleUrls: ['./child-requests-dashboard-page.component.css']
})
export class ChildRequestsDashboardPageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  familyStateIsLoading$: Observable<boolean>;
  childRequests$: Observable<ChildRequest[]>;
  currentFamily$: Observable<number>;
  currentAuthUser$: Observable<AuthUser>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.familyStateIsLoading$ = this.store.select(selectFamilyStateIsLoading);
    this.currentAuthUser$ = this.store.select(selectCurrentAuthUser);
    this.currentFamily$ = this.store.select(selectCurrentSelectedFamily);
    this.childRequests$ = this.store.select(selectFamilyStateChildRequests);
  }

  onActionPressed(requestAction: ChildRequestAction) {
    this.store.dispatch(new ChangeFamilyChildRequestStatus(requestAction));
  }
}
