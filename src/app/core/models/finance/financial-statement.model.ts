import {FinancialStatementType} from './financial-statement-type';

export class FinancialStatement {
  id: number;
  type: FinancialStatementType;
  familyId: number;
  amount: number;
  target?: string;
  description?: string;
  images?: Blob[];
  data?: string;
}
