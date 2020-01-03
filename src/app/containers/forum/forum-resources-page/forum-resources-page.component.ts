import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthUser} from '../../../core/models/auth/auth-user.model';
import {FinancialStatement} from '../../../core/models/finance/financial-statement.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUser, selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {selectFinancialStateIsLoading, selectUserFinancialStatements} from '../../../store/selectors/financial.selectors';
import {GetFinancialStatementsForUser} from '../../../store/actions/financial.actions';
import {selectForumResources, selectForumStateIsLoading} from '../../../store/selectors/forum.selectors';
import {FinancialResource} from '../../../core/models/forum/financial-resource.model';
import {GetForumResources} from '../../../store/actions/forum.actions';

@Component({
  selector: 'app-forum-resources-page',
  templateUrl: './forum-resources-page.component.html',
  styleUrls: ['./forum-resources-page.component.css']
})
export class ForumResourcesPageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isForumStateLoading$: Observable<boolean>;
  forumResources$: Observable<FinancialResource[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetForumResources());
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
    this.isForumStateLoading$ = this.store.select(selectForumStateIsLoading);
    this.forumResources$ = this.store.select(selectForumResources);
  }

}
