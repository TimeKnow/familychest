import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ForumPost} from '../../../core/models/forum/forum-post.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {GetForumPost, GetForumPostAnswers} from '../../../store/actions/forum.actions';
import {selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {
  selectCurrentPost,
  selectCurrentPostAnswers,
  selectForumStateIsLoading
} from '../../../store/selectors/forum.selectors';
import {ActivatedRoute} from '@angular/router';
import {ForumAnswer} from '../../../core/models/forum/forum-answer.model';

@Component({
  selector: 'app-forum-selected-post-page',
  templateUrl: './forum-selected-post-page.component.html',
  styleUrls: ['./forum-selected-post-page.component.css']
})
export class ForumSelectedPostPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isForumStateLoading$: Observable<boolean>;
  currentPost$: Observable<ForumPost>;
  currentPostAnswers$: Observable<ForumAnswer[]>;
  currentPostId: number;

  constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentPostId = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10);
    this.store.dispatch(new GetForumPost(this.currentPostId));
    this.store.dispatch(new GetForumPostAnswers(this.currentPostId));
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.isForumStateLoading$ = this.store.select(selectForumStateIsLoading);
    this.currentPost$ = this.store.select(selectCurrentPost);
    this.currentPostAnswers$ = this.store.select(selectCurrentPostAnswers);
  }
}
