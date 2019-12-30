import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import applicationState from './state';
import {AuthUserRoles} from '../core/models/auth/auth-user-roles';
import {FamilyUserRoles} from '../core/models/family/family-user-roles';
import {ChildRequestStatus} from '../core/models/family/child-request-status';
import {ChildRequestAction, RequestActionToRequestStatusMapper} from '../core/models/family/child-request-action';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const {url, method, headers, body} = req;

    return of(null)
      .pipe(mergeMap(handleRequest))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRequest(): Observable<any> {
      switch (true) {
        case req.url.includes('api/login') && method === 'POST':
          return handleLogin(body);
        case req.url.includes('api/register/parent') && method === 'POST':
          return handleRegistration(body, AuthUserRoles.Parent);
        case req.url.includes('api/register/child') && method === 'POST':
          return handleRegistration(body, AuthUserRoles.Child);
        case req.url.includes('api/logout') && method === 'POST':
          return handleLogout();
        case req.url.includes('api/me/notifications') && method === 'GET':
          return handleGetNotification();
        case req.url.includes('api/me/notifications') && method === 'DELETE':
          return handleRemoveNotification();
        case req.url.includes('api/me') && method === 'GET':
          return handleGetCurrentUser();
        case req.url.match(/\/families\/\d+$/) && method === 'GET':
          return handleGetFamilyMembers();
        case req.url.match(/\/families\/members$/) && method === 'GET':
          return handleGetAvailableUserForFamily();
        case req.url.match(/\/families\/\d+\/child-requests$/) && method === 'GET':
          return handleGetFamilyChildRequests();
        case req.url.match(/\/families\/\d+\/child-requests$/) && method === 'POST':
          return handleChangeChildRequestStatus();
        case req.url.includes('api/families') && method === 'GET':
          return handleGetFamilies();
        case req.url.match(/\/families\/\d+$/) && method === 'POST':
          return handleAddFamilyMember();
        case req.url.includes('api/families') && method === 'POST':
          return handleCreateFamily();
        default:
          return okRequest('');
      }
    }

    function handleChangeChildRequestStatus() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);
      const childRequests = applicationState.familyChildRequests[id];
      if (childRequests === undefined) {
        return badRequest('Invalid request!');
      }
      const requestBody: ChildRequestAction = body;
      const specificRequest = childRequests.find(x => x.id === requestBody.requestId);
      if (specificRequest === undefined) {
        return badRequest('Invalid request ID!');
      }
      specificRequest.status = RequestActionToRequestStatusMapper[requestBody.type];
      return okRequest('');
    }

    function handleGetFamilyChildRequests() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);
      const childRequests = applicationState.familyChildRequests[id];
      if (childRequests === undefined) {
        return badRequest('Invalid request!');
      }
      return okRequest(childRequests.filter(x => x.status !== ChildRequestStatus.Removed));
    }

    function handleAddFamilyMember() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 1]);
      const family = applicationState.families.find(x => x.id === id);
      const user = applicationState.users.find(x => x.id === body.member);
      if (!family || !user) {
        return badRequest('Invalid request!');
      }
      family.members = family.members.concat([{user, role: body.role}]);
      return okRequest('');
    }

    function handleCreateFamily() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const newId = getNewIdForSet(applicationState.families);
      const family = {
        id: newId,
        members: [{user: applicationState.currentSession, role: FamilyUserRoles.Parent}],
        name: body.family,
      };
      applicationState.families = applicationState.families.concat([family]);
      applicationState.familyChildRequests[newId] = [];
      return okRequest({id: newId, name: body.family});
    }

    function handleGetFamilyMembers() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 1]);
      const result = applicationState.families.find(x => x.id === id);
      return result ? okRequest(result.members) : badRequest('Invalid family!');
    }

    function handleGetFamilies() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const result = applicationState.families.filter(x => x.members.find(y => y.user.id === applicationState.currentSession.id));
      return okRequest(result);
    }

    function handleGetAvailableUserForFamily() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      return okRequest(applicationState.users);
    }

    function handleLogin(requestBody) {
      const user = applicationState.users.find(x => x.email === requestBody.email && x.password === requestBody.password);
      if (!!user) {
        applicationState.currentSession = user;
        return okRequest(user);
      } else {
        return unauthorizedRequest();
      }
    }

    function handleLogout() {
      applicationState.currentSession = null;
      return okRequest('');
    }

    function handleGetCurrentUser() {
      const user = applicationState.currentSession;
      if (!!user) {
        return okRequest(user);
      } else {
        return unauthorizedRequest();
      }
    }

    function handleRegistration(requestBody, registrationRole: AuthUserRoles) {
      const isChildUUIDValid = applicationState.childUUIDs.find(x => requestBody.uuid === x);
      switch (registrationRole) {
        case AuthUserRoles.Child: {
          const doesUserExist = applicationState.users.find(x => x.uuid === requestBody.uuid);
          if (!isChildUUIDValid) {
            return badRequest('Invalid Child UUID Code!');
          }
          if (!!doesUserExist) {
            doesUserExist.uuid = requestBody.uuid;
            doesUserExist.name = requestBody.name;
            doesUserExist.password = requestBody.password;
            applicationState.childUUIDs = applicationState.childUUIDs.filter(x => requestBody.uuid === x);
            return okRequest('Account created');
          }
          break;
        }
        case AuthUserRoles.Parent: {
          const doesUserExist = applicationState.users.find(x => x.email === requestBody.email);
          if (!doesUserExist) {
            const newId = getNewIdForSet(applicationState.users);
            applicationState.users = applicationState.users.concat([{
              id: newId,
              email: requestBody.email,
              password: requestBody.password,
              uuid: '',
              name: requestBody.name,
              role: registrationRole
            }]);
            return okRequest('Account Created');
          }
          break;
        }
      }

      return badRequest('Unexpected registration error case');
    }

    function handleGetNotification() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      return okRequest(applicationState.notifications[applicationState.currentSession.id]);
    }

    function handleRemoveNotification() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      applicationState.notifications[applicationState.currentSession.id] = null;
      return okRequest('');
    }

    function getNewIdForSet(set): number {
      return set.reduce((accum, val) => Math.max(accum, val.id), -1) + 1;
    }

    function okRequest(responseBody?) {
      return of(new HttpResponse({status: 200, body: responseBody}));
    }

    function unauthorizedRequest() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function badRequest(responseMessage: string) {
      return throwError({status: 401, error: {message: responseMessage}});
    }

    function notFoundRequest() {
      return throwError({status: 404, error: {message: 'Not Found'}});
    }

  }
}
