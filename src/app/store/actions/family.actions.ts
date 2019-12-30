import {Action} from '@ngrx/store';
import {Family} from '../../core/models/family/family.model';
import {FamilyUser} from '../../core/models/family/family-user.model';
import {AuthUser} from '../../core/models/auth/auth-user.model';
import {ChildRequest} from '../../core/models/family/child-request.model';
import {ChildRequestAction} from '../../core/models/family/child-request-action';

export enum FamilyActionsTypes {
  SelectCurrentFamily = '[Family] Select Current Family',
  GetFamilies = '[Family] Get Families',
  GetFamiliesSuccess = '[Family] Get Families Success',
  GetFamilyMembers = '[Family] Get Family Members',
  GetFamilyMembersSuccess = '[Family] Get Family Members Success',
  GenerateCodeForChild = '[Family] Generate Code For Child',
  GenerateCodeForChildSuccess = '[Family] Generate Code For Child Success',
  AddMemberToFamily = '[Family] Add Member to Family',
  AddMemberToFamilySuccess = '[Family] Add Member to Family Success',
  CreateFamily = '[Family] Create Family',
  CreateFamilySuccess = '[Family] Create Family Success',
  GetAvailableUserForFamily = '[Family] Get Available Users for Family',
  GetAvailableUserForFamilySuccess = '[Family] Get Available Users for Family Success',
  GetFamilyChildRequests = '[Family] Get Child Requests for Family',
  GetFamilyChildRequestsSuccess = '[Family] Get Child Requests for Family Success',
  ChangeFamilyChildRequestStatus = '[Family] Change Child Request Status',
  ChangeFamilyChildRequestStatusSuccess = '[Family] Change Child Request Status Success'
}

export class SelectCurrentFamily implements Action {
  public readonly type = FamilyActionsTypes.SelectCurrentFamily;

  constructor(public payload: number) {
  }
}

export class GetFamilies implements Action {
  public readonly type = FamilyActionsTypes.GetFamilies;
}

export class GetFamiliesSuccess implements Action {
  public readonly type = FamilyActionsTypes.GetFamiliesSuccess;

  constructor(public payload: Family[]) {
  }
}

export class GetFamilyMembers implements Action {
  public readonly type = FamilyActionsTypes.GetFamilyMembers;

  constructor(public payload: number) {
  }
}

export class GetFamilyMembersSuccess implements Action {
  public readonly type = FamilyActionsTypes.GetFamilyMembersSuccess;

  constructor(public payload: FamilyUser[]) {
  }
}

export class GenerateCodeForChild implements Action {
  public readonly type = FamilyActionsTypes.GenerateCodeForChild;

  constructor(public payload: { email: string, selectedFamily: number }) {
  }
}

export class GenerateCodeForChildSuccess implements Action {
  public readonly type = FamilyActionsTypes.GenerateCodeForChildSuccess;

  constructor(public payload: string) {
  }
}

export class AddMemberToFamily implements Action {
  public readonly type = FamilyActionsTypes.AddMemberToFamily;

  constructor(public payload: { memberId: number, familyId: number, role: string }) {
  }
}

export class AddMemberToFamilySuccess implements Action {
  public readonly type = FamilyActionsTypes.AddMemberToFamilySuccess;

  constructor(public payload: number) {
  }
}

export class CreateFamily implements Action {
  public readonly type = FamilyActionsTypes.CreateFamily;

  constructor(public payload: string) {
  }
}

export class CreateFamilySuccess implements Action {
  public readonly type = FamilyActionsTypes.CreateFamilySuccess;

  constructor(public payload: Family) {
  }
}

export class GetAvailableUserForFamily implements Action {
  public readonly type = FamilyActionsTypes.GetAvailableUserForFamily;
}

export class GetAvailableUserForFamilySuccess implements Action {
  public readonly type = FamilyActionsTypes.GetAvailableUserForFamilySuccess;

  constructor(public payload: AuthUser[]) {
  }
}

export class GetFamilyChildRequests implements Action {
  public readonly type = FamilyActionsTypes.GetFamilyChildRequests;

  constructor(public payload: number) {
  }
}

export class GetFamilyChildRequestsSuccess implements Action {
  public readonly type = FamilyActionsTypes.GetFamilyChildRequestsSuccess;

  constructor(public payload: ChildRequest[]) {
  }
}

export class ChangeFamilyChildRequestStatus implements Action {
  public readonly type = FamilyActionsTypes.ChangeFamilyChildRequestStatus;

  constructor(public payload: ChildRequestAction) {
  }
}

export class ChangeFamilyChildRequestStatusSuccess implements Action {
  public readonly type = FamilyActionsTypes.ChangeFamilyChildRequestStatusSuccess;

  constructor(public payload: number) {
  }
}

export type FamilyActions =
  SelectCurrentFamily
  | GetFamilies
  | GetFamiliesSuccess
  | GetFamilyMembers
  | GetFamilyMembersSuccess
  | GenerateCodeForChild
  | GenerateCodeForChildSuccess
  | AddMemberToFamily
  | AddMemberToFamilySuccess
  | CreateFamily
  | CreateFamilySuccess
  | GetAvailableUserForFamily
  | GetAvailableUserForFamilySuccess
  | GetFamilyChildRequests
  | GetFamilyChildRequestsSuccess
  | ChangeFamilyChildRequestStatus
  | ChangeFamilyChildRequestStatusSuccess;
