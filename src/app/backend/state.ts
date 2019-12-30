import {AuthUserRoles} from '../core/models/auth/auth-user-roles';
import {AuthUser} from '../core/models/auth/auth-user.model';
import {Family} from '../core/models/family/family.model';
import {UserNotification} from '../core/models/auth/user-notification.model';
import {FamilyUser} from '../core/models/family/family-user.model';
import {FamilyUserRoles} from '../core/models/family/family-user-roles';
import {ChildRequest} from '../core/models/family/child-request.model';
import {ChildRequestStatus} from '../core/models/family/child-request-status';

export class ApplicationBackendStateAuthUser extends AuthUser {
  uuid: string;
  password: string;
}

export class ApplicationBackendFamily extends Family {
  members: FamilyUser[];
}

export interface ApplicationBackendState {
  currentSession: ApplicationBackendStateAuthUser;
  childUUIDs: string[];
  users: ApplicationBackendStateAuthUser[];
  notifications: { [key: number]: UserNotification };
  families: ApplicationBackendFamily[];
  familyChildRequests: { [key: number]: ChildRequest[] };
}

const applicationState: ApplicationBackendState = {
  currentSession: {
    id: 1,
    email: 'parent@email.com',
    uuid: '',
    name: 'parent',
    password: 'parent',
    role: AuthUserRoles.Parent
  },
  childUUIDs: ['1', '2'],
  users: [
    {
      id: 0,
      email: 'child@email.com',
      uuid: '',
      name: 'child',
      password: 'child',
      role: AuthUserRoles.Child
    },
    {
      id: 1,
      email: 'parent@email.com',
      uuid: '',
      name: 'parent',
      password: 'parent',
      role: AuthUserRoles.Parent
    },
    {
      id: 2,
      email: 'admin@email.com',
      uuid: '',
      name: 'admin',
      password: 'admin',
      role: AuthUserRoles.Admin
    },

    {
      id: 3,
      email: 'registered-child@email.com',
      uuid: '1',
      name: 'registered-child',
      password: 'registered-child',
      role: AuthUserRoles.Child
    },
  ],
  notifications: {
    0: {
      id: 0,
      title: 'Notification',
      description: 'You have a notification'
    },
    1: {
      id: 1,
      title: 'Notification',
      description: 'You have a notification'
    },
    2: {
      id: 2,
      title: 'Notification',
      description: 'You have a notification'
    },
    3: {
      id: 3,
      title: 'Notification',
      description: 'You have a notification'
    }
  },
  families: [
    {
      id: 1,
      name: 'Family 1',
      members: [
        {
          user: {
            id: 1,
            email: 'parent@email.com',
            name: 'parent',
            role: AuthUserRoles.Parent
          },
          role: FamilyUserRoles.Father
        },
        {
          user: {
            id: 0,
            email: 'child@email.com',
            name: 'child',
            role: AuthUserRoles.Child
          },
          role: FamilyUserRoles.Child
        }
      ]
    }
  ],
  familyChildRequests: {
    1: [{
      id: 0,
      senderId: 0,
      sender: 'child',
      amount: 500,
      reason: 'I am fat',
      status: ChildRequestStatus.Pending,
      title: 'I neeed dulciuri'
    }]
  }
};
export default applicationState;
