import {ChildUserRegistration} from './child-user-registration';
import {ParentUserRegistration} from './parent-user-registration';
import {RegistrationType} from './registration-type';

export class RegistrationCredential {
  credential: ChildUserRegistration | ParentUserRegistration;
  type: RegistrationType;
}
