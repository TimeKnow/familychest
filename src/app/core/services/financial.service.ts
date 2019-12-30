import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FinancialStatement} from '../models/finance/financial-statement.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getFinancialStatementsByFamily(familyId: number): Observable<FinancialStatement[]> {
    return this.http.get<FinancialStatement[]>('/api/family/' + familyId + '/financial-statements', this.httpOptions);
  }

  createFinancialStatementsByFamily(statement: FinancialStatement): Observable<FinancialStatement> {
    return this.http.post<FinancialStatement>('/api/family/' + statement.familyId + '/financial-statements', statement, this.httpOptions);
  }

  updateFinancialStatementsByFamily(statement: FinancialStatement): Observable<FinancialStatement> {
    return this.http.put<FinancialStatement>('/api/family/' + statement.familyId + '/financial-statements', statement, this.httpOptions);
  }

  removeFinancialStatementsByFamily(statement: FinancialStatement): Observable<{}> {
    return this.http.delete<{}>('/api/family/' + statement.familyId + '/financial-statements/' + statement.id, this.httpOptions);
  }
}
