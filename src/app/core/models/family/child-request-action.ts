import {ChildRequestStatus} from './child-request-status';

export enum ChildRequestActionType {
  Approve = 'Approve',
  Reject = 'Reject',
  Remove = 'Remove'
}

export const ChildRequestActionTypeArray = ChildRequestActionType;

export class ChildRequestAction {
  requestId: number;
  familyId: number;
  type: ChildRequestActionType;
}

export const RequestActionToRequestStatusMapper: { [key: string]: ChildRequestStatus } = {
  [ChildRequestActionType.Approve]: ChildRequestStatus.Approved,
  [ChildRequestActionType.Reject]: ChildRequestStatus.Rejected,
  [ChildRequestActionType.Remove]: ChildRequestStatus.Removed,
};
