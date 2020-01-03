import {ForumPost} from '../../core/models/forum/forum-post.model';
import {ForumAnswer} from '../../core/models/forum/forum-answer.model';
import {FinancialResource} from '../../core/models/forum/financial-resource.model';

export interface ForumState {
  loading: boolean;
  forumPosts: ForumPost[];
  currentPost: ForumPost;
  currentPostAnswers: ForumAnswer[];
  forumResources: FinancialResource[];
}

export const initialForumState: ForumState = {
  loading: false,
  currentPost: null,
  forumPosts: [],
  currentPostAnswers: [],
  forumResources: []
};
