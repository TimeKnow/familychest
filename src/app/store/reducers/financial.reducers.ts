import {FinancialState, initialFinancialState} from '../state/financial.state';
import {FinancialActions, FinancialActionsTypes} from '../actions/financial.actions';

export function financialReducers(state: FinancialState = initialFinancialState, action: FinancialActions) {
  switch (action.type) {
    case FinancialActionsTypes.GetFinancialStatementsForFamily:
      return {
        ...state,
        loading: true
      };
    case FinancialActionsTypes.GetFinancialStatementsForFamilySuccess:
      return {
        ...state,
        loading: false,
        statements: action.payload
      };
    case FinancialActionsTypes.CreateFinancialStatementForFamily:
      return {
        ...state,
        loading: true
      };
    case FinancialActionsTypes.CreateFinancialStatementForFamilySuccess:
      return {
        ...state,
        loading: false,
        statements: state.statements.concat([action.payload])
      };
    case FinancialActionsTypes.RemoveFinancialStatementForFamily:
      return {
        ...state,
        loading: true
      };
    case FinancialActionsTypes.RemoveFinancialStatementForFamilySuccess:
      return {
        ...state,
        statements: state.statements.filter(x => x.id !== action.payload.id),
        loading: false
      };
    case FinancialActionsTypes.UpdateFinancialStatementForFamily:
      return {
        ...state,
        loading: true
      };
    case FinancialActionsTypes.UpdateFinancialStatementForFamilySuccess:
      const updatedElement = state.statements.find(x => x.id !== action.payload.id);
      return {
        ...state,
        statements: state.statements.filter(x => x.id !== action.payload.id).concat([updatedElement]),
        loading: false
      };
    default:
      return state;
  }
}
