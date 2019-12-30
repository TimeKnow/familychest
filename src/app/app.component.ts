import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/state/app.state';
import {GetCurrentUser} from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(new GetCurrentUser(false));
  }
}
