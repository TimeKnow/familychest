import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {Family} from '../../../core/models/family/family.model';
import {selectFamilies, selectFamilyAvailableUsers} from '../../../store/selectors/family.selectors';
import {AddMemberToFamily, GetAvailableUserForFamily, GetFamilies} from '../../../store/actions/family.actions';

@Component({
  selector: 'app-add-family-member-page',
  templateUrl: './add-family-member-page.component.html',
  styleUrls: ['./add-family-member-page.component.css']
})
export class AddFamilyMemberPageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  form: FormGroup;
  userFamilies$: Observable<Family[]>;
  users$: Observable<AuthUser[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetFamilies());
    this.store.dispatch(new GetAvailableUserForFamily());
    this.userFamilies$ = this.store.select(selectFamilies);
    this.users$ = this.store.select(selectFamilyAvailableUsers);

    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.form = new FormGroup({
      selectedUser: new FormControl(null, Validators.required),
      selectedFamily: new FormControl(null, Validators.required),
      selectedRole: new FormControl(null, Validators.required)
    });
  }

  onAddMember() {
    const payload = {
      memberId: this.form.get('selectedUser').value,
      familyId: this.form.get('selectedFamily').value,
      role: this.form.get('selectedRole').value
    };
    this.store.dispatch(new AddMemberToFamily(payload));
  }
}
