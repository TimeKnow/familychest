import {AuthUser} from '../auth/auth-user.model';
import {FamilyUserRoles} from './family-user-roles';
import {Family} from './family.model';

export class FamilyUser {
  user: AuthUser;
  family?: Family;
  role: FamilyUserRoles;
}
