import {Component, OnInit} from '@angular/core';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {selectForumPosts, selectForumStateIsLoading} from '../../../store/selectors/forum.selectors';
import {ForumPost} from '../../../core/models/forum/forum-post.model';
import {GetForumPosts} from '../../../store/actions/forum.actions';

@Component({
  selector: 'app-forum-posts-page',
  templateUrl: './forum-posts-page.component.html',
  styleUrls: ['./forum-posts-page.component.css']
})
export class ForumPostsPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isForumStateLoading$: Observable<boolean>;
  forumPosts$: Observable<ForumPost[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetForumPosts());
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.isForumStateLoading$ = this.store.select(selectForumStateIsLoading);
    this.forumPosts$ = this.store.select(selectForumPosts);
  }

}
