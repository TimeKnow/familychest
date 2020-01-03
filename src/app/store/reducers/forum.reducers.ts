import {ForumState, initialForumState} from '../state/forum.state';
import {ForumActions, ForumActionsTypes} from '../actions/forum.actions';

export function forumReducers(state: ForumState = initialForumState, action: ForumActions) {
  switch (action.type) {
    case ForumActionsTypes.GetForumPosts:
      return {
        ...state,
        loading: true
      };
    case ForumActionsTypes.GetForumPostsSuccess:
      return {
        ...state,
        loading: false,
        forumPosts: action.payload
      };
    case ForumActionsTypes.GetForumPost:
      return {
        ...state,
        loading: true
      };
    case ForumActionsTypes.GetForumPostSuccess:
      return {
        ...state,
        loading: false,
        currentPost: action.payload
      };
    case ForumActionsTypes.GetForumPostAnswers:
      return {
        ...state,
        loading: true
      };
    case ForumActionsTypes.GetForumPostAnswersSuccess:
      return {
        ...state,
        loading: false,
        currentPostAnswers: action.payload
      };
    case ForumActionsTypes.GetForumResources:
      return {
        ...state,
        loading: true
      };
    case ForumActionsTypes.GetForumResourcesSuccess:
      return {
        ...state,
        loading: false,
        forumResources: action.payload
      };
    case ForumActionsTypes.CreateForumPost:
      return {
        ...state,
        loading: true
      };
    case ForumActionsTypes.CreateForumPostSuccess:
      return {
        ...state,
        loading: false,
        forumPosts: state.forumPosts.concat([action.payload])
      };
    case ForumActionsTypes.CreateForumPostAnswer:
      return {
        ...state,
        loading: true
      };
    case ForumActionsTypes.CreateForumPostAnswerSuccess:
      return {
        ...state,
        loading: false,
        currentPostAnswers: state.currentPostAnswers.concat([action.payload])
      };
    case ForumActionsTypes.CreateForumResource:
      return {
        ...state,
        loading: true
      };
    case ForumActionsTypes.CreateForumResourceSuccess:
      return {
        ...state,
        loading: false,
        forumResources: state.forumResources.concat([action.payload])
      };
    default:
      return state;
  }
}
