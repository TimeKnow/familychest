import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {selectCurrentAuthUserIsLoading} from '../../../store/selectors/auth.selectors';
import {RegisterUser} from '../../../store/actions/auth.actions';
import {ChildUserRegistration} from '../../../core/models/auth/child-user-registration';
import {RegistrationCredential} from '../../../core/models/auth/registration-credential';
import {RegistrationType} from '../../../core/models/auth/registration-type';
import {ParentUserRegistration} from '../../../core/models/auth/parent-user-registration';
import {selectHttpErrorMessage} from '../../../store/selectors/http-errors.selectors';

export enum RegistrationFormTypes {
  ParentForm = 'parent',
  ChildForm = 'child'
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  formTypes = {child: RegistrationFormTypes.ChildForm, parent: RegistrationFormTypes.ParentForm};
  selectedFormType = RegistrationFormTypes.ParentForm;

  registerParentForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  registerChildForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    uuid: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.errorMessage$ = this.store.select(selectHttpErrorMessage);
    this.isLoading$ = this.store.select(selectCurrentAuthUserIsLoading);
  }


  registerChildAccount() {
    const childUserRegistration: ChildUserRegistration = this.registerChildForm.value;
    const registrationCredential: RegistrationCredential = {
      credential: childUserRegistration,
      type: RegistrationType.ChildAccount
    };
    this.store.dispatch(new RegisterUser(registrationCredential));
  }

  registerParentAccount() {
    const childUserRegistration: ParentUserRegistration = this.registerParentForm.value;
    const registrationCredential: RegistrationCredential = {
      credential: childUserRegistration,
      type: RegistrationType.ParentAccount
    };
    this.store.dispatch(new RegisterUser(registrationCredential));
  }
}
