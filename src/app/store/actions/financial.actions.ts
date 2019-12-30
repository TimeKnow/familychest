import {Action} from '@ngrx/store';
import {FinancialStatement} from '../../core/models/finance/financial-statement.model';

export enum FinancialActionsTypes {
  GetFinancialStatementsForFamily = '[Financial] Get Financial Statements for Family',
  GetFinancialStatementsForFamilySuccess = '[Financial] Get Financial Statements for Family Success',
  CreateFinancialStatementForFamily = '[Financial] Create Financial Statement for Family',
  CreateFinancialStatementForFamilySuccess = '[Financial] Create Financial Statement for Family Success',
  UpdateFinancialStatementForFamily = '[Financial] Update Financial Statement for Family',
  UpdateFinancialStatementForFamilySuccess = '[Financial] Update Financial Statement for Family Success',
  RemoveFinancialStatementForFamily = '[Financial] Remove Financial Statement for Family',
  RemoveFinancialStatementForFamilySuccess = '[Financial] Remove Financial Statement for Family Success',
}

export class GetFinancialStatementsForFamily implements Action {
  public readonly type = FinancialActionsTypes.GetFinancialStatementsForFamily;

  constructor(public payload: number) {
  }
}

export class GetFinancialStatementsForFamilySuccess implements Action {
  public readonly type = FinancialActionsTypes.GetFinancialStatementsForFamilySuccess;

  constructor(public payload: FinancialStatement[]) {
  }
}

export class CreateFinancialStatementForFamily implements Action {
  public readonly type = FinancialActionsTypes.CreateFinancialStatementForFamily;

  constructor(public payload: FinancialStatement) {
  }
}

export class CreateFinancialStatementForFamilySuccess implements Action {
  public readonly type = FinancialActionsTypes.CreateFinancialStatementForFamilySuccess;

  constructor(public payload: FinancialStatement) {
  }
}

export class UpdateFinancialStatementForFamily implements Action {
  public readonly type = FinancialActionsTypes.UpdateFinancialStatementForFamily;

  constructor(public payload: FinancialStatement) {
  }
}

export class UpdateFinancialStatementForFamilySuccess implements Action {
  public readonly type = FinancialActionsTypes.UpdateFinancialStatementForFamilySuccess;

  constructor(public payload: FinancialStatement) {
  }
}

export class RemoveFinancialStatementForFamily implements Action {
  public readonly type = FinancialActionsTypes.RemoveFinancialStatementForFamily;

  constructor(public payload: Partial<FinancialStatement>) {
  }
}

export class RemoveFinancialStatementForFamilySuccess implements Action {
  public readonly type = FinancialActionsTypes.RemoveFinancialStatementForFamilySuccess;

  constructor(public payload: Partial<FinancialStatement>) {
  }
}

export type FinancialActions =
  GetFinancialStatementsForFamily
  | GetFinancialStatementsForFamilySuccess
  | CreateFinancialStatementForFamily
  | CreateFinancialStatementForFamilySuccess
  | UpdateFinancialStatementForFamily
  | UpdateFinancialStatementForFamilySuccess
  | RemoveFinancialStatementForFamily
  | RemoveFinancialStatementForFamilySuccess;
