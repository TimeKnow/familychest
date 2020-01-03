import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {FinancialStatement} from '../../../core/models/finance/financial-statement.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {selectFamilyStateIsLoading} from '../../../store/selectors/family.selectors';
import {
  selectFinancialStateIsLoading,
  selectFinancialStatements,
  selectUserFinancialStatements
} from '../../../store/selectors/financial.selectors';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {GetFinancialStatementsForUser} from '../../../store/actions/financial.actions';
import {map} from 'rxjs/operators';
import {FinancialStatementType} from '../../../core/models/finance/financial-statement-type';

@Component({
  selector: 'app-financial-statistics-charts-page',
  templateUrl: './financial-statistics-charts-page.component.html',
  styleUrls: ['./financial-statistics-charts-page.component.css']
})
export class FinancialStatisticsChartsPageComponent implements OnInit {
  authIsLoading$: Observable<boolean>;
  familyIsLoading$: Observable<boolean>;
  currentUser$: Observable<AuthUser>;
  financeStatesIsLoading$: Observable<boolean>;
  familyStatements$: Observable<FinancialStatement[]>;
  userFinancialStatements$: Observable<FinancialStatement[]>;

  selectedDataType = null;
  chartDataTypes = ['Personal', 'Family'];

  selectedDataFilter;
  selectedYearFilter;

  chartData$: Observable<Array<any>>;

  constructor(private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  ngOnInit() {

    this.selectedDataFilter = 'Balance';
    this.selectedYearFilter = 'All';
    this.authIsLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.familyIsLoading$ = this.store.select(selectFamilyStateIsLoading);
    this.financeStatesIsLoading$ = this.store.select(selectFinancialStateIsLoading);
    this.currentUser$ = this.store.select(selectCurrentAuthUser);
    this.familyStatements$ = this.store.select(selectFinancialStatements);
    this.userFinancialStatements$ = this.store.select(selectUserFinancialStatements);
    this.currentUser$.subscribe(x => this.store.dispatch(new GetFinancialStatementsForUser(x.id)));
  }

  onDataFilterChanged(newFilter: string) {
    this.selectedDataFilter = newFilter;
    this.onDataTypeChange(this.selectedDataType);
  }

  onYearFilterChanged(newFilter: string) {
    this.selectedYearFilter = newFilter;
    this.onDataTypeChange(this.selectedDataType);
  }
  onDataTypeChange(selectedValue: string) {
    switch (selectedValue) {
      case 'Personal':
        this.chartData$ = this.userFinancialStatements$.pipe(
          map(statements => this.filterByType(statements, this.selectedDataFilter)),
          map(statements => this.filterByDate(statements, this.selectedYearFilter)),
          map(this.mapToChartData));
        break;
      case 'Family':
        this.chartData$ = this.familyStatements$.pipe(
          map(statements => this.filterByType(statements, this.selectedDataFilter)),
          map(statements => this.filterByDate(statements, this.selectedYearFilter)),
          map(this.mapToChartData));
        break;
      default:
        this.chartData$ = of(null);
    }

    this.selectedDataType = selectedValue;
    this.changeDetectorRef.detectChanges();
  }

  mapToChartData(statements: FinancialStatement[]): Array<any> {
    console.log(statements);
    return statements.sort((x, y): number => (y.date.getMilliseconds() - x.date.getMilliseconds())).map(x => [x.date, x.amount]);
  }

  filterByType(statements: FinancialStatement[], type: string): FinancialStatement[] {
    return !type || type === 'Balance' ? statements : statements.filter(x => x.type === type);
  }

  filterByDate(statements: FinancialStatement[], type: string) {
    const currentDate: Date = new Date(Date.now());
    switch (type) {
      case 'Month':
        return statements.filter(x => x.date.getMonth() === currentDate.getMonth());
      case 'Year':
        return statements.filter(x => x.date.getFullYear() === currentDate.getFullYear());
    }
    return statements;
  }
}
