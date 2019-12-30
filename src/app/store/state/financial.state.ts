import {FinancialStatement} from '../../core/models/finance/financial-statement.model';

export interface FinancialState {
  loading: boolean;
  statements: FinancialStatement[];
}

export const initialFinancialState: FinancialState = {
  loading: false,
  statements: []
};
