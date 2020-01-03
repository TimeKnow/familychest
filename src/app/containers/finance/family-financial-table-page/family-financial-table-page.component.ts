import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {FinancialStatement} from '../../../core/models/finance/financial-statement.model';
import {FamilyMemberFinancialStatus} from '../../../core/models/finance/family-member-financial-status';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectFamilyAvailableUsers, selectFamilyStateIsLoading} from '../../../store/selectors/family.selectors';
import {selectFinancialStateIsLoading, selectFinancialStatements} from '../../../store/selectors/financial.selectors';
import {map} from 'rxjs/operators';
import {calculateTotalAmountForStatements, getStatementsCoefficient} from '../../../core/utils/financial-calculus.util';
import {groupByObjectNumberAttribute} from '../../../core/utils/list.util';
import {GetAvailableUserForFamily} from '../../../store/actions/family.actions';

@Component({
  selector: 'app-family-financial-table-page',
  templateUrl: './family-financial-table-page.component.html',
  styleUrls: ['./family-financial-table-page.component.css']
})
export class FamilyFinancialTablePageComponent implements OnInit {

  authIsLoading$: Observable<boolean>;
  familyIsLoading$: Observable<boolean>;
  financeStatesIsLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  availableUsers$: Observable<AuthUser[]>;
  statements$: Observable<FinancialStatement[]>;
  familyFinancialStatusList$: Observable<FamilyMemberFinancialStatus[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAvailableUserForFamily());
    this.authIsLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.familyIsLoading$ = this.store.select(selectFamilyStateIsLoading);
    this.financeStatesIsLoading$ = this.store.select(selectFinancialStateIsLoading);
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.availableUsers$ = this.store.select(selectFamilyAvailableUsers);
    this.statements$ = this.store.select(selectFinancialStatements);
    this.familyFinancialStatusList$ = combineLatest(this.availableUsers$, this.statements$)
      .pipe(map(([users, statements]) => this.mapToMemberFinancialStatus(users, statements)));
  }

  mapToMemberFinancialStatus(users: AuthUser[], statements: FinancialStatement[]): FamilyMemberFinancialStatus[] {
    const mappedFinancialData: { [key: number]: FinancialStatement[] } = groupByObjectNumberAttribute(statements, 'userId');
    const mappedUsersData: { [key: number]: FinancialStatement[] } = groupByObjectNumberAttribute(users, 'id');
    return Object.entries(mappedFinancialData).map(([key, value]) => {
      return {
        userId: +key,
        email: mappedUsersData[key][0].email,
        name: mappedUsersData[key][0].name,
        currentAccountBalance: calculateTotalAmountForStatements(value),
        statementCoefficient: getStatementsCoefficient(value)
      } as FamilyMemberFinancialStatus;
    });
  }

}
