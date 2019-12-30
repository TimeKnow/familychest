import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, filter, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {FamilyService} from '../../core/services/family.service';
import {
  AddMemberToFamily, AddMemberToFamilySuccess, ChangeFamilyChildRequestStatus, ChangeFamilyChildRequestStatusSuccess,
  CreateFamily, CreateFamilySuccess,
  FamilyActionsTypes,
  GenerateCodeForChild, GenerateCodeForChildSuccess, GetAvailableUserForFamily, GetAvailableUserForFamilySuccess,
  GetFamilies,
  GetFamiliesSuccess, GetFamilyChildRequests, GetFamilyChildRequestsSuccess,
  GetFamilyMembers,
  GetFamilyMembersSuccess, SelectCurrentFamily
} from '../actions/family.actions';
import {Family} from '../../core/models/family/family.model';
import {HttpError} from '../actions/http-errors.actions';
import {FamilyUser} from '../../core/models/family/family-user.model';
import {ChildRequest} from '../../core/models/family/child-request.model';

@Injectable()
export class FamilyEffects {
  constructor(
    private familyService: FamilyService,
    private actions$: Actions,
    private router: Router
  ) {
  }

  @Effect()
  getFamilies$ = this.actions$.pipe(
    ofType<GetFamilies>(FamilyActionsTypes.GetFamilies),
    switchMap(() => this.familyService.getFamilies().pipe(
      map((families: Family[]) => new GetFamiliesSuccess(families)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  getFamilyMembers$ = this.actions$.pipe(
    ofType<GetFamilyMembers>(FamilyActionsTypes.GetFamilyMembers),
    map(action => action.payload),
    switchMap(familyId => this.familyService.getFamilyMembers(familyId).pipe(
      map((users: FamilyUser[]) => new GetFamilyMembersSuccess(users)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  generateCodeForChild$ = this.actions$.pipe(
    ofType<GenerateCodeForChild>(FamilyActionsTypes.GenerateCodeForChild),
    switchMap(action => this.familyService.generateCodeForChild(action.payload.email, action.payload.selectedFamily).pipe(
      map((code: string) => new GenerateCodeForChildSuccess(code)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  generateCodeForChildSuccess$ = this.actions$.pipe(
    ofType<GenerateCodeForChildSuccess>(FamilyActionsTypes.GenerateCodeForChildSuccess),
    map(() => new GetFamilies())
  );

  @Effect()
  createFamily$ = this.actions$.pipe(
    ofType<CreateFamily>(FamilyActionsTypes.CreateFamily),
    switchMap(action => this.familyService.createFamily(action.payload).pipe(
      map((newFamily: Family) => new CreateFamilySuccess(newFamily)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect({dispatch: false})
  createFamilySuccess$ = this.actions$.pipe(
    ofType<CreateFamilySuccess>(FamilyActionsTypes.CreateFamilySuccess),
    tap(() => this.router.navigateByUrl(''))
  );

  @Effect()
  addMemberToFamily$ = this.actions$.pipe(
    ofType<AddMemberToFamily>(FamilyActionsTypes.AddMemberToFamily),
    switchMap(action => this.familyService.addMemberToFamily(action.payload.memberId, action.payload.familyId, action.payload.role).pipe(
      map(() => new AddMemberToFamilySuccess(action.payload.familyId)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  addMemberToFamilySuccess$ = this.actions$.pipe(
    ofType<AddMemberToFamilySuccess>(FamilyActionsTypes.AddMemberToFamilySuccess),
    map(action => new GetFamilyMembers(action.payload)),
    tap(() => this.router.navigateByUrl('family/members'))
  );

  @Effect()
  getAvailableFamilyUsers$ = this.actions$.pipe(
    ofType<GetAvailableUserForFamily>(FamilyActionsTypes.GetAvailableUserForFamily),
    switchMap(familyId => this.familyService.getAvailableUserForFamily().pipe(
      map(familiyUsers => new GetAvailableUserForFamilySuccess(familiyUsers)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  // This may be the case of some errors in the future. Suggest global navbar
  @Effect()
  selectCurrentFamily$ = this.actions$.pipe(
    ofType<SelectCurrentFamily>(FamilyActionsTypes.SelectCurrentFamily),
    filter(action => !!(+action.payload)),
    switchMap(action => [new GetFamilyMembers(action.payload), new GetFamilyChildRequests(action.payload)])
  );

  @Effect()
  getFamilyChildRequests$ = this.actions$.pipe(
    ofType<GetFamilyChildRequests>(FamilyActionsTypes.GetFamilyChildRequests),
    map(action => action.payload),
    switchMap(familyId => this.familyService.getChildRequestForFamily(familyId).pipe(
      map((childRequests: ChildRequest[]) => new GetFamilyChildRequestsSuccess(childRequests)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  changeFamilyChildRequestStatus$ = this.actions$.pipe(
    ofType<ChangeFamilyChildRequestStatus>(FamilyActionsTypes.ChangeFamilyChildRequestStatus),
    switchMap(action => this.familyService.changeChildRequestStatus(action.payload).pipe(
      map(() => new ChangeFamilyChildRequestStatusSuccess(action.payload.familyId)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  changeFamilyChildRequestStatusSuccess$ = this.actions$.pipe(
    ofType<ChangeFamilyChildRequestStatusSuccess>(FamilyActionsTypes.ChangeFamilyChildRequestStatusSuccess),
    map(action => new GetFamilyChildRequests(action.payload))
  );
}
