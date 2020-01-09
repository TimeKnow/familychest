import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ForumPost} from '../../../core/models/forum/forum-post.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {CreateForumPost, GetForumPosts} from '../../../store/actions/forum.actions';
import {selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {selectForumPosts, selectForumStateIsLoading} from '../../../store/selectors/forum.selectors';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';

@Component({
  selector: 'app-create-forum-post-page',
  templateUrl: './create-forum-post-page.component.html',
  styleUrls: ['./create-forum-post-page.component.css']
})
export class CreateForumPostPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isForumStateLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  form: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.isForumStateLoading$ = this.store.select(selectForumStateIsLoading);
    this.errorMessage$ = this.store.select(selectHttpErrorMessage);
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null)
    });
  }

  onCreate() {
    const payload: ForumPost = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      image: this.form.get('image').value
    };
    this.store.dispatch(new CreateForumPost(payload));
  }
}
