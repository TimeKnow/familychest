import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpError} from '../actions/http-errors.actions';
import {ForumService} from '../../core/services/forum.service';
import {
  CreateForumPost, CreateForumPostAnswer, CreateForumPostAnswerSuccess, CreateForumPostSuccess,
  CreateForumResource, CreateForumResourceSuccess,
  ForumActionsTypes,
  GetForumPost,
  GetForumPostAnswers,
  GetForumPostAnswersSuccess,
  GetForumPosts, GetForumPostsSuccess,
  GetForumPostSuccess, GetForumResources, GetForumResourcesSuccess
} from '../actions/forum.actions';

@Injectable()
export class ForumEffects {
  constructor(
    private forumService: ForumService,
    private actions$: Actions,
    private router: Router
  ) {
  }

  @Effect()
  getForumPost$ = this.actions$.pipe(
    ofType<GetForumPost>(ForumActionsTypes.GetForumPost),
    map(action => action.payload),
    switchMap(postId => this.forumService.getForumPost(postId).pipe(
      map(forumPost => new GetForumPostSuccess(forumPost)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  getForumPosts$ = this.actions$.pipe(
    ofType<GetForumPosts>(ForumActionsTypes.GetForumPosts),
    switchMap(() => this.forumService.getForumPosts().pipe(
      map(forumPosts => new GetForumPostsSuccess(forumPosts)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  getForumPostAnswers$ = this.actions$.pipe(
    ofType<GetForumPostAnswers>(ForumActionsTypes.GetForumPostAnswers),
    map(action => action.payload),
    switchMap(postId => this.forumService.getForumPostAnswers(postId).pipe(
      map(forumPostAnswers => new GetForumPostAnswersSuccess(forumPostAnswers)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  getForumResources$ = this.actions$.pipe(
    ofType<GetForumResources>(ForumActionsTypes.GetForumResources),
    switchMap(() => this.forumService.getForumResources().pipe(
      map(forumResources => new GetForumResourcesSuccess(forumResources)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect()
  createForumResource$ = this.actions$.pipe(
    ofType<CreateForumResource>(ForumActionsTypes.CreateForumResource),
    switchMap(action => this.forumService.createForumResource(action.payload).pipe(
      map(forumResource => new CreateForumResourceSuccess(forumResource)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect({dispatch: false})
  createForumResourceSuccess$ = this.actions$.pipe(
    ofType<CreateForumResourceSuccess>(ForumActionsTypes.CreateForumResourceSuccess),
    tap(() => this.router.navigateByUrl('/forum/resources'))
  );

  @Effect()
  createForumPost$ = this.actions$.pipe(
    ofType<CreateForumPost>(ForumActionsTypes.CreateForumPost),
    switchMap(action => this.forumService.createForumPost(action.payload).pipe(
      map(forumPost => new CreateForumPostSuccess(forumPost)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect({dispatch: false})
  createForumPostSuccess$ = this.actions$.pipe(
    ofType<CreateForumPostSuccess>(ForumActionsTypes.CreateForumPostSuccess),
    tap(() => this.router.navigateByUrl('/forum'))
  );

  @Effect()
  createForumPostAnswer$ = this.actions$.pipe(
    ofType<CreateForumPostAnswer>(ForumActionsTypes.CreateForumPostAnswer),
    switchMap(action => this.forumService.createForumAnswer(action.payload.postId, action.payload.data).pipe(
      map(forumPost => new CreateForumPostAnswerSuccess(forumPost)),
      catchError(error => of(new HttpError(error)))
    ))
  );

  @Effect({dispatch: false})
  createForumPostAnswerSuccess$ = this.actions$.pipe(
    ofType<CreateForumPostAnswerSuccess>(ForumActionsTypes.CreateForumPostAnswerSuccess),
    tap(() => this.router.navigateByUrl('/forum'))
  );
}
