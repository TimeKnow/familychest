import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {selectForumStateIsLoading} from '../../../store/selectors/forum.selectors';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';
import {ForumPost} from '../../../core/models/forum/forum-post.model';
import {CreateForumPost, CreateForumResource} from '../../../store/actions/forum.actions';
import {FinancialResource} from '../../../core/models/forum/financial-resource.model';

@Component({
  selector: 'app-create-forum-resource-page',
  templateUrl: './create-forum-resource-page.component.html',
  styleUrls: ['./create-forum-resource-page.component.css']
})
export class CreateForumResourcePageComponent implements OnInit {
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
      type: new FormControl('', [Validators.required]),
      context: new FormControl('', [Validators.required])
    });
  }

  onCreate() {
    const payload: FinancialResource = {
      title: this.form.get('title').value,
      type: this.form.get('type').value,
      context: this.form.get('context').value,
    };
    this.store.dispatch(new CreateForumResource(payload));
  }
}
