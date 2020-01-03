import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {
  selectCurrentAuthUser,
  selectCurrentAuthUserIsLoading
} from '../../../store/selectors/auth.selectors';
import {FormControl, FormGroup} from '@angular/forms';
import {CreateFamily} from '../../../store/actions/family.actions';

@Component({
  selector: 'app-create-family-page',
  templateUrl: './create-family-page.component.html',
  styleUrls: ['./create-family-page.component.css']
})
export class CreateFamilyPageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  form: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.form = new FormGroup({
      familyName: new FormControl('')
    });
  }

  onCreate() {
    const name = this.form.get('familyName').value;
    this.store.dispatch(new CreateFamily(name));
  }
}
