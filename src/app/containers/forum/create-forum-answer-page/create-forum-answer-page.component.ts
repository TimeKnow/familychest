import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {selectForumStateIsLoading} from '../../../store/selectors/forum.selectors';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';
import {ForumPost} from '../../../core/models/forum/forum-post.model';
import {CreateForumPost, CreateForumPostAnswer} from '../../../store/actions/forum.actions';
import {ActivatedRoute} from '@angular/router';
import {ForumAnswer} from '../../../core/models/forum/forum-answer.model';

@Component({
  selector: 'app-create-forum-answer-page',
  templateUrl: './create-forum-answer-page.component.html',
  styleUrls: ['./create-forum-answer-page.component.css']
})
export class CreateForumAnswerPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isForumStateLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  form: FormGroup;
  currentPostId: number;

  constructor(private store: Store<AppState>, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentPostId = parseInt(this.activeRoute.snapshot.paramMap.get('id'), 10);
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.isForumStateLoading$ = this.store.select(selectForumStateIsLoading);
    this.errorMessage$ = this.store.select(selectHttpErrorMessage);
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onCreate() {
    const payload: ForumAnswer = {
      postId: this.currentPostId,
      title: this.form.get('title').value,
      description: this.form.get('description').value
    };
    this.store.dispatch(new CreateForumPostAnswer({postId: this.currentPostId, data: payload}));
  }
}
