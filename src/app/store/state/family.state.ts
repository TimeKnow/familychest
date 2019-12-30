import {Family} from '../../core/models/family/family.model';
import {FamilyUser} from '../../core/models/family/family-user.model';
import {AuthUser} from '../../core/models/auth/auth-user.model';
import {ChildRequest} from '../../core/models/family/child-request.model';

export interface FamilyState {
  loading: boolean;
  currentFamily: number;
  availableUsersForFamily: AuthUser[];
  families: Family[];
  familyMembers: FamilyUser[];
  generatedCode: string | null;
  childRequests: ChildRequest[];
}

export const initialFamilyState: FamilyState = {
  loading: false,
  currentFamily: null,
  availableUsersForFamily: [],
  families: [],
  familyMembers: [],
  generatedCode: null,
  childRequests: [],
};
