import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {EmailCredential} from '../../../core/models/auth/email-credential';
import {LoginUser} from '../../../store/actions/auth.actions';
import {selectLoginIsLoading} from '../../../store/selectors/auth.selectors';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  loginForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.errorMessage$ = this.store.select(selectHttpErrorMessage);
    this.isLoading$ = this.store.select(selectLoginIsLoading);
  }

  submitLogin() {
    const credential = new EmailCredential();
    credential.email = this.loginForm.get('email').value;
    credential.password = this.loginForm.get('password').value;
    this.store.dispatch(new LoginUser(credential));
  }
}
