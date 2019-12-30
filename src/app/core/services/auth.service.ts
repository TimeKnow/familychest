import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EmailCredential} from '../models/auth/email-credential';
import {Observable, of} from 'rxjs';
import {AuthUser} from '../models/auth/auth-user.model';
import {ParentUserRegistration} from '../models/auth/parent-user-registration';
import {ChildUserRegistration} from '../models/auth/child-user-registration';
import {RegistrationCredential} from '../models/auth/registration-credential';
import {RegistrationType} from '../models/auth/registration-type';
import {UserNotification} from '../models/auth/user-notification.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  register(registrationCredential: RegistrationCredential): Observable<string> {
    switch (registrationCredential.type) {
      case RegistrationType.ChildAccount:
        return this.registerChildAccount(registrationCredential.credential as ChildUserRegistration);
      case RegistrationType.ParentAccount:
        return this.registerParentAccount(registrationCredential.credential as ParentUserRegistration);
    }
    return of(null);
  }

  registerParentAccount(parentRegistration: ParentUserRegistration): Observable<string> {
    return this.http.post<string>('/api/register/parent', parentRegistration, this.httpOptions);
  }

  registerChildAccount(childRegistration: ChildUserRegistration): Observable<string> {
    return this.http.post<string>('/api/register/child', childRegistration, this.httpOptions);
  }

  login(credential: EmailCredential): Observable<{}> {
    return this.http.post('/api/login', credential, this.httpOptions);
  }

  logout(): Observable<{}> {
    return this.http.post('/api/logout', {}, this.httpOptions);
  }

  getCurrentUser(): Observable<AuthUser> {
    return this.http.get<AuthUser>('/api/me', this.httpOptions);
  }

  getNotification(): Observable<UserNotification> {
    return this.http.get<UserNotification>('api/me/notifications', this.httpOptions);
  }

  removeNotification(): Observable<any> {
    return this.http.delete<any>('api/me/notifications', this.httpOptions);
  }
}
