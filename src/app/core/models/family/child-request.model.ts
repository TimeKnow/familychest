import {ChildRequestStatus} from './child-request-status';

export class ChildRequest {
  id?: number;
  imageUrl?: Blob| string;
  senderId: number;
  sender: string;
  familyId?: number;
  title: string;
  amount: number;
  reason: string;
  status?: ChildRequestStatus;
}
