import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {Family} from '../../../core/models/family/family.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {CreateChildRequest, GetFamilies} from '../../../store/actions/family.actions';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';
import {selectFamilies} from '../../../store/selectors/family.selectors';
import {ChildRequest} from '../../../core/models/family/child-request.model';

@Component({
  selector: 'app-create-child-request-page',
  templateUrl: './create-child-request-page.component.html',
  styleUrls: ['./create-child-request-page.component.css']
})
export class CreateChildRequestPageComponent implements OnInit {
  authIsLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  families$: Observable<Family[]>;
  errorMessage$: Observable<string>;

  currentUser: AuthUser = null;
  form: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetFamilies());
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.authIsLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.errorMessage$ = this.store.select(selectHttpErrorMessage);
    this.families$ = this.store.select(selectFamilies);
    this.currentUser$.subscribe(x => this.currentUser = x);
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      selectedFamily: new FormControl(null, [Validators.required]),
      amountInput: new FormControl(null, [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      image: new FormControl(null),
    });
  }

  onCreate() {
    const payload: ChildRequest = {
      title: this.form.get('title').value,
      senderId: this.currentUser.id,
      sender: this.currentUser.name,
      familyId: this.form.get('selectedFamily').value,
      amount: this.form.get('amountInput').value,
      reason: this.form.get('reason').value,
      imageUrl: this.form.get('image').value,
    };
    this.store.dispatch(new CreateChildRequest(payload));
  }

}
