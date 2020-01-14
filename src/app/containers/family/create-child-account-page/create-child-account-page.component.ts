import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {Family} from '../../../core/models/family/family.model';
import {selectFamilies, selectFamilyStateGeneratedCode} from '../../../store/selectors/family.selectors';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';
import {GenerateCodeForChild, GetFamilies} from '../../../store/actions/family.actions';

@Component({
  selector: 'app-create-child-account-page',
  templateUrl: './create-child-account-page.component.html',
  styleUrls: ['./create-child-account-page.component.css']
})
export class CreateChildAccountPageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  userFamilies$: Observable<Family[]>;
  errorMessage$: Observable<string>;
  generatedCode$: Observable<string>;
  form: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetFamilies());
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.generatedCode$ = this.store.select(selectFamilyStateGeneratedCode);
    this.errorMessage$ = this.store.select(selectHttpErrorMessage);
    this.userFamilies$ = this.store.select(selectFamilies);
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      selectedFamily: new FormControl(null, [Validators.required])
    });
  }

  onCreate() {
    const payload = {email: this.form.get('email').value, selectedFamily: this.form.get('selectedFamily').value};
    this.store.dispatch(new GenerateCodeForChild(payload));
  }
}
