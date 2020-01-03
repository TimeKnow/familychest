import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {ForumState} from '../state/forum.state';


const selectForumState = (state: AppState) => state.forumState;

export const selectForumStateIsLoading = createSelector(
  selectForumState,
  (state: ForumState) => state.loading
);

export const selectCurrentPostAnswers = createSelector(
  selectForumState,
  (state: ForumState) => state.currentPostAnswers
);

export const selectCurrentPost = createSelector(
  selectForumState,
  (state: ForumState) => state.currentPost
);

export const selectForumPosts = createSelector(
  selectForumState,
  (state: ForumState) => state.forumPosts
);

export const selectForumResources = createSelector(
  selectForumState,
  (state: ForumState) => state.forumResources
);
