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
    return this.http.get<FinancialStatement[]>('/api/families/' + familyId + '/financial-statements', this.httpOptions);
  }


  createFinancialStatementsByFamily(statement: FinancialStatement): Observable<FinancialStatement> {
    return this.http.post<FinancialStatement>('/api/families/' + statement.familyId + '/financial-statements', statement, this.httpOptions);
  }

  updateFinancialStatementsByFamily(statement: FinancialStatement): Observable<FinancialStatement> {
    return this.http.put<FinancialStatement>('/api/families/' + statement.familyId + '/financial-statements', statement, this.httpOptions);
  }

  getFinancialStatementsByUser(userId: number): Observable<FinancialStatement[]> {
    return this.http.get<FinancialStatement[]>('/api/finances/' + userId, this.httpOptions);
  }

  removeFinancialStatement(statementId: number): Observable<{}> {
    return this.http.delete<{}>('/api/finances/' + statementId, this.httpOptions);
  }
}
