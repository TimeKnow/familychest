import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FinancialStatement} from '../../../core/models/finance/financial-statement.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {selectFinancialStateIsLoading, selectUserFinancialStatements} from '../../../store/selectors/financial.selectors';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {GetFinancialStatementsForUser, RemoveFinancialStatementForFamily} from '../../../store/actions/financial.actions';

@Component({
  selector: 'app-personal-financial-table-page',
  templateUrl: './personal-financial-table-page.component.html',
  styleUrls: ['./personal-financial-table-page.component.css']
})
export class PersonalFinancialTablePageComponent implements OnInit {

  authIsLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  financeStatesIsLoading$: Observable<boolean>;
  userFinancialStatements$: Observable<FinancialStatement[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.authIsLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.financeStatesIsLoading$ = this.store.select(selectFinancialStateIsLoading);
    this.userFinancialStatements$ = this.store.select(selectUserFinancialStatements);
    this.currentUser$.subscribe(x => this.store.dispatch(new GetFinancialStatementsForUser(x.id)));
  }

  onDeleteActionPressed(id: number) {
    this.store.dispatch(new RemoveFinancialStatementForFamily(id));
  }
}
