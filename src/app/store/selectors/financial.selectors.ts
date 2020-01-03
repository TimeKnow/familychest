import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {FinancialState} from '../state/financial.state';


const selectFinancialState = (state: AppState) => state.financialState;

export const selectFinancialStateIsLoading = createSelector(
  selectFinancialState,
  (state: FinancialState) => state.loading
);

export const selectFinancialStatements = createSelector(
  selectFinancialState,
  (state: FinancialState) => state.statements
);

export const selectUserFinancialStatements = createSelector(
  selectFinancialState,
  (state: FinancialState) => state.statementsUser
);
