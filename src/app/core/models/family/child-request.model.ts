import {ChildRequestStatus} from './child-request-status';

export class ChildRequest {
  id: number;
  imageUrl?: string;
  senderId: number;
  sender: string;
  title: string;
  amount: number;
  reason: string;
  status: ChildRequestStatus;
}
