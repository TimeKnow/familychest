import {Action} from '@ngrx/store';
import {ForumPost} from '../../core/models/forum/forum-post.model';
import {ForumAnswer} from '../../core/models/forum/forum-answer.model';
import {FinancialResource} from '../../core/models/forum/financial-resource.model';

export enum ForumActionsTypes {
  GetForumPosts = '[Forum] Get Forum Posts',
  GetForumPostsSuccess = '[Forum] Get Forum Posts Success',
  GetForumPost = '[Forum] Get Forum Post',
  GetForumPostSuccess = '[Forum] Get Forum Post Success',
  GetForumPostAnswers = '[Forum] Get Forum Post Answers',
  GetForumPostAnswersSuccess = '[Forum] Get Forum Post Answers Success',
  GetForumResources = '[Forum] Get Forum Resources',
  GetForumResourcesSuccess = '[Forum] Get Forum Resources Success',
  CreateForumPost = '[Forum] Create Forum Post',
  CreateForumPostSuccess = '[Forum] Create Forum Post Success',
  CreateForumPostAnswer = '[Forum] Create Forum Answer Post',
  CreateForumPostAnswerSuccess = '[Forum] Create Forum Post Answer Success',
  CreateForumResource = '[Forum] Create Forum Resource',
  CreateForumResourceSuccess = '[Forum] Create Forum Resource Success',
}

export class GetForumPosts implements Action {
  public readonly type = ForumActionsTypes.GetForumPosts;
}

export class GetForumPostsSuccess implements Action {
  public readonly type = ForumActionsTypes.GetForumPostsSuccess;

  constructor(public payload: ForumPost[]) {
  }
}

export class GetForumPost implements Action {
  public readonly type = ForumActionsTypes.GetForumPost;

  constructor(public payload: number) {
  }
}

export class GetForumPostSuccess implements Action {
  public readonly type = ForumActionsTypes.GetForumPostSuccess;

  constructor(public payload: ForumPost) {
  }
}

export class GetForumPostAnswers implements Action {
  public readonly type = ForumActionsTypes.GetForumPostAnswers;

  constructor(public payload: number) {
  }
}

export class GetForumPostAnswersSuccess implements Action {
  public readonly type = ForumActionsTypes.GetForumPostAnswersSuccess;

  constructor(public payload: ForumAnswer[]) {
  }
}

export class GetForumResources implements Action {
  public readonly type = ForumActionsTypes.GetForumResources;

}

export class GetForumResourcesSuccess implements Action {
  public readonly type = ForumActionsTypes.GetForumResourcesSuccess;

  constructor(public payload: FinancialResource[]) {
  }
}

export class CreateForumPost implements Action {
  public readonly type = ForumActionsTypes.CreateForumPost;

  constructor(public payload: ForumPost) {
  }
}

export class CreateForumPostSuccess implements Action {
  public readonly type = ForumActionsTypes.CreateForumPostSuccess;

  constructor(public payload: ForumPost) {
  }
}

export class CreateForumPostAnswer implements Action {
  public readonly type = ForumActionsTypes.CreateForumPostAnswer;

  constructor(public payload: { postId: number, data: ForumAnswer }) {
  }
}

export class CreateForumPostAnswerSuccess implements Action {
  public readonly type = ForumActionsTypes.CreateForumPostAnswerSuccess;

  constructor(public payload: ForumAnswer) {
  }
}

export class CreateForumResource implements Action {
  public readonly type = ForumActionsTypes.CreateForumResource;

  constructor(public payload: FinancialResource) {
  }
}

export class CreateForumResourceSuccess implements Action {
  public readonly type = ForumActionsTypes.CreateForumResourceSuccess;

  constructor(public payload: FinancialResource) {
  }
}

export type ForumActions =
  GetForumPosts
  | GetForumPostsSuccess
  | GetForumPost
  | GetForumPostSuccess
  | GetForumPostAnswers
  | GetForumPostAnswersSuccess
  | GetForumResources
  | GetForumResourcesSuccess
  | CreateForumPost
  | CreateForumPostSuccess
  | CreateForumPostAnswer
  | CreateForumPostAnswerSuccess
  | CreateForumResource
  | CreateForumResourceSuccess;
