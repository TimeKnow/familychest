import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpError} from '../actions/http-errors.actions';
import {FinancialService} from '../../core/services/financial.service';
import {
  CreateFinancialStatementForFamily, CreateFinancialStatementForFamilySuccess,
  FinancialActionsTypes,
  GetFinancialStatementsForFamily,
  GetFinancialStatementsForFamilySuccess, GetFinancialStatementsForUser, GetFinancialStatementsForUserSuccess,
  RemoveFinancialStatementForFamily, RemoveFinancialStatementForFamilySuccess,
  UpdateFinancialStatementForFamily,
  UpdateFinancialStatementForFamilySuccess
} from '../actions/financial.actions';
import {FinancialStatement} from '../../core/models/finance/financial-statement.model';

@Injectable()
export class FinancialEffects {
  constructor(
    private financialService: FinancialService,
    private actions$: Actions,
    private router: Router
  ) {
  }

  @Effect()
  getFinancialStatements$ = this.actions$.pipe(
    ofType<GetFinancialStatementsForFamily>(FinancialActionsTypes.GetFinancialStatementsForFamily),
    map(action => action.payload),
    switchMap(familyId => this.financialService.getFinancialStatementsByFamily(familyId).pipe(
      map((statements: FinancialStatement[]) => new GetFinancialStatementsForFamilySuccess(statements)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  createFinancialStatements$ = this.actions$.pipe(
    ofType<CreateFinancialStatementForFamily>(FinancialActionsTypes.CreateFinancialStatementForFamily),
    map(action => action.payload),
    switchMap(newStatement => this.financialService.createFinancialStatementsByFamily(newStatement).pipe(
      map((statement: FinancialStatement) => new CreateFinancialStatementForFamilySuccess(statement)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect({dispatch: false})
  createFinancialStatementSuccess$ = this.actions$.pipe(
    ofType<CreateFinancialStatementForFamilySuccess>(FinancialActionsTypes.CreateFinancialStatementForFamilySuccess),
    tap(() => this.router.navigateByUrl('/finance/personal'))
  );

  @Effect()
  updateFinancialStatements$ = this.actions$.pipe(
    ofType<UpdateFinancialStatementForFamily>(FinancialActionsTypes.UpdateFinancialStatementForFamily),
    map(action => action.payload),
    switchMap(updateStatement => this.financialService.updateFinancialStatementsByFamily(updateStatement).pipe(
      map((statement: FinancialStatement) => new UpdateFinancialStatementForFamilySuccess(statement)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  removeFinancialStatements$ = this.actions$.pipe(
    ofType<RemoveFinancialStatementForFamily>(FinancialActionsTypes.RemoveFinancialStatement),
    map(action => action.payload),
    switchMap(removedStatementId =>
      this.financialService.removeFinancialStatement(removedStatementId).pipe(
        map(() => new RemoveFinancialStatementForFamilySuccess(removedStatementId)),
        catchError(error => of(new HttpError(error)))
      ))
  );

  @Effect()
  getFinancialStatementsUser$ = this.actions$.pipe(
    ofType<GetFinancialStatementsForUser>(FinancialActionsTypes.GetFinancialStatementsForUser),
    map(action => action.payload),
    switchMap(userId => this.financialService.getFinancialStatementsByUser(userId).pipe(
      map((statements: FinancialStatement[]) => new GetFinancialStatementsForUserSuccess(statements)),
      catchError(error => of(new HttpError(error)))
    ))
  );
}
