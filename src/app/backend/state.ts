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
    email: 'JohnnyDoeChild@email.com',
    uuid: '',
    name: 'JohnDoe',
    password: 'parola',
    role: AuthUserRoles.Child
  },
  childUUIDs: ['1', '2'],
  users: [
    {
      id: 0,
      email: 'JanieDoeChild@email.com',
      uuid: '',
      name: 'JanieDoe',
      password: 'parola',
      role: AuthUserRoles.Child
    },
    {
      id: 1,
      email: 'JohnDoeParent@email.com',
      uuid: '',
      name: 'JohnDoe',
      password: 'parola',
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
      name: 'Doe',
      members: [
        {
          user: {
            id: 1,
            email: 'JohnDoeParent@email.com',
            name: 'JohnDoe',
            role: AuthUserRoles.Parent
          },
          role: FamilyUserRoles.Father
        },
        {
          user: {
            id: 0,
            email: 'JohnnyDoeChild@email.com',
            name: 'JohnnyDoe',
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
      sender: 'JohnnyDoe',
      amount: 500,
      reason: 'I want a new gane',
      status: ChildRequestStatus.Pending,
      title: 'Monopoly'
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
  forumPosts: [{id: 1, description: 'I want to know the best way to manage my money.', favorite: false, title: 'How to manage my spendings?'}],
  forumAnswers: [{id: 1, postId: 1, description: 'You should check the book "Financial Peace"', title: 'Best book'}, {
    id: 2,
    postId: 1,
    description: 'I recommend you "Secrets of the millionaire mind"',
    title: 'Secrets of the millionaire mind'
  }, {id: 3, postId: 1, description: 'Check this article: https://www.thebalance.com/ways-to-be-better-with-money-960664', title: '10 ways to manage your money'}],
  forumResources: [{id: 1, title: 'How to win money', context: 'book', type: 'pdf'}],
};
export default applicationState;
