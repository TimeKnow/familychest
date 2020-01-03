import {FinancialStatement} from '../models/finance/financial-statement.model';
import {groupByObjectStringAttribute} from './list.util';
import {FinancialStatementType} from '../models/finance/financial-statement-type';

export function calculateTotalAmountForStatements(statements: FinancialStatement[]): number {
  const groupedStatements: { [key: number]: FinancialStatement[] } = groupByObjectStringAttribute(statements, 'type');

  const totalIncome = groupedStatements[FinancialStatementType.Income] ? groupedStatements[FinancialStatementType.Income]
    .reduce((accum, val): number => accum + val.amount, 0) : 0;
  const totalExpense = groupedStatements[FinancialStatementType.Expense] ? groupedStatements[FinancialStatementType.Expense]
    .reduce((accum, val): number => accum + val.amount, 0) : 0;
  return totalIncome - totalExpense;
}

export function getStatementsCoefficient(statements: FinancialStatement[]): number {
  const groupedStatements: { [key: number]: FinancialStatement[] } = groupByObjectStringAttribute(statements, 'type');
  const totalIncome = groupedStatements[FinancialStatementType.Income] ? groupedStatements[FinancialStatementType.Income].length : 0;
  const totalExpense = groupedStatements[FinancialStatementType.Expense] ? groupedStatements[FinancialStatementType.Expense].length : 0;
  return totalIncome / totalExpense;
}
