import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {FinancialStatement} from '../../../core/models/finance/financial-statement.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {CreateFinancialStatementForFamily} from '../../../store/actions/financial.actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Family} from '../../../core/models/family/family.model';
import {selectFamilies} from '../../../store/selectors/family.selectors';
import {GetFamilies} from '../../../store/actions/family.actions';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';

@Component({
  selector: 'app-create-financial-statement-page',
  templateUrl: './create-financial-statement-page.component.html',
  styleUrls: ['./create-financial-statement-page.component.css']
})
export class CreateFinancialStatementPageComponent implements OnInit {
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
      type: new FormControl(null, [Validators.required]),
      selectedFamily: new FormControl(null, [Validators.required]),
      amountInput: new FormControl(null, [Validators.required]),
      target: new FormControl(null),
      description: new FormControl(''),
      images: new FormControl(null),
    });
  }

  onCreate() {
    const payload: FinancialStatement = {
      type: this.form.get('type').value,
      userId: this.currentUser.id,
      date: new Date(Date.now()),
      familyId: this.form.get('selectedFamily').value,
      amount: this.form.get('amountInput').value,
      target: this.form.get('target').value,
      description: this.form.get('description').value,
    };
    this.store.dispatch(new CreateFinancialStatementForFamily(payload));
  }
}
