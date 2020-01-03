import {FinancialStatementType} from './financial-statement-type';

export class FinancialStatement {
  id?: number;
  type: FinancialStatementType;
  userId: number;
  familyId: number;
  amount: number;
  date: Date;
  target?: string;
  description?: string;
  images?: Blob[] | string[];
}
