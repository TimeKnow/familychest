import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {FamilyUser} from '../../../core/models/family/family-user.model';
import {selectFamilyMembers, selectFamilyStateIsLoading} from '../../../store/selectors/family.selectors';

@Component({
  selector: 'app-family-list-page',
  templateUrl: './family-list-page.component.html',
  styleUrls: ['./family-list-page.component.css']
})
export class FamilyListPageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  familyIsLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  familyUsers$: Observable<FamilyUser[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.familyIsLoading$ = this.store.select(selectFamilyStateIsLoading);
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.familyUsers$ = this.store.select(selectFamilyMembers);
  }

  onAction(eventType: string) {
    console.log(eventType);
  }

}
