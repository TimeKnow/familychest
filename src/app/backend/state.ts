import {AuthUserRoles} from '../core/models/auth/auth-user-roles';
import {AuthUser} from '../core/models/auth/auth-user.model';
import {Family} from '../core/models/family/family.model';
import {UserNotification} from '../core/models/auth/user-notification.model';
import {FamilyUser} from '../core/models/family/family-user.model';
import {FamilyUserRoles} from '../core/models/family/family-user-roles';
import {ChildRequest} from '../core/models/family/child-request.model';
import {ChildRequestStatus} from '../core/models/family/child-request-status';
import {FinancialStatement} from '../core/models/finance/financial-statement.model';
import {FinancialStatementType} from '../core/models/finance/financial-statement-type';
import {ForumPost} from '../core/models/forum/forum-post.model';
import {ForumAnswer} from '../core/models/forum/forum-answer.model';
import {FinancialResource} from '../core/models/forum/financial-resource.model';

const addDays = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

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
  financialStatements: FinancialStatement[];
  forumPosts: ForumPost[];
  forumAnswers: ForumAnswer[];
  forumResources: FinancialResource[];
}

// TODO: Modify data
const applicationState: ApplicationBackendState = {
  currentSession: {
    id: 1,
    email: 'parent@email.com',
    uuid: '',
    name: 'parent',
    password: 'parent',
    role: AuthUserRoles.Child
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
  },
  financialStatements: [
    {
      id: 0,
      type: FinancialStatementType.Income,
      amount: 500,
      familyId: 1,
      userId: 1,
      date: addDays(-5),
      target: 'Magazin 1 SRL'
    },
    {
      id: 1,
      type: FinancialStatementType.Income,
      amount: 200,
      familyId: 1,
      userId: 1,
      date: addDays(-4),
      target: 'Magazin 2 SRL'
    },
    {
      id: 2,
      type: FinancialStatementType.Income,
      amount: 400,
      familyId: 1,
      userId: 1,
      date: addDays(-3),
      target: 'Magazin 2 SRL'
    },
    {
      id: 3,
      type: FinancialStatementType.Income,
      amount: 600,
      familyId: 1,
      userId: 1,
      date: addDays(-2),
      target: 'Magazin 2 SRL'
    },
    {
      id: 4,
      type: FinancialStatementType.Expense,
      amount: 600,
      familyId: 1,
      userId: 1,
      date: addDays(-1),
      target: 'Magazin 2 SRL'
    },
    {
      id: 5,
      type: FinancialStatementType.Expense,
      amount: 100,
      familyId: 1,
      userId: 0,
      date: addDays(0),
      target: 'Magazin 2 SRL'
    },
    {
      id: 6,
      type: FinancialStatementType.Expense,
      amount: 100,
      familyId: 1,
      userId: 0,
      date: addDays(1),
      target: 'Magazin 2 SRL'
    }
  ],
  forumPosts: [{id: 1, description: 'Mega Ultra Question', favorite: false, title: 'Mega Ultra Question ttle'}],
  forumAnswers: [{id: 1, postId: 1, description: 'Ceva Answer', title: 'Ceva Answer Title'}, {
    id: 2,
    postId: 1,
    description: 'Ceva Answer',
    title: 'Ceva Answer Title'
  }, {id: 3, postId: 1, description: 'Ceva Answer', title: 'Ceva Answer Title'}],
  forumResources: [{id: 1, title: 'How to win money', context: 'book', type: 'pdf'}],
};
export default applicationState;
