import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import applicationState from './state';
import {AuthUserRoles} from '../core/models/auth/auth-user-roles';
import {FamilyUserRoles} from '../core/models/family/family-user-roles';
import {ChildRequestStatus} from '../core/models/family/child-request-status';
import {ChildRequestAction, RequestActionToRequestStatusMapper} from '../core/models/family/child-request-action';
import {FinancialStatement} from '../core/models/finance/financial-statement.model';
import {ChildRequest} from '../core/models/family/child-request.model';
import {ForumAnswer} from '../core/models/forum/forum-answer.model';
import {ForumPost} from '../core/models/forum/forum-post.model';
import {FinancialResource} from '../core/models/forum/financial-resource.model';

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
        case req.url.match(/\/families\/\d+\/financial-statements$/) && method === 'GET':
          return handleGetFamilyFinancialStatements();
        case req.url.match(/\/families\/\d+\/financial-statements$/) && method === 'POST':
          return handleCreateFamilyFinancialStatements();
        case req.url.match(/\/families\/\d+\/financial-statements\/\d+$/) && method === 'PUT':
          return handleUpdateFamilyFinancialStatements();
        case req.url.match(/\/families\/\d+\/child-requests$/) && method === 'GET':
          return handleGetFamilyChildRequests();
        case req.url.match(/\/families\/\d+\/child-requests$/) && method === 'PUT':
          return handleChangeChildRequestStatus();
        case req.url.match(/\/families\/\d+\/child-requests$/) && method === 'POST':
          return handleCreateChildRequest();
        case req.url.includes('api/families') && method === 'GET':
          return handleGetFamilies();
        case req.url.match(/\/families\/\d+$/) && method === 'POST':
          return handleAddFamilyMember();
        case req.url.includes('api/families') && method === 'POST':
          return handleCreateFamily();
        case req.url.match(/\/finances\/\d+$/) && method === 'DELETE':
          return handleDeleteFinancialStatements();
        case req.url.match(/\/finances\/\d+$/) && method === 'GET':
          return handleGetUserFinancialStatements();
        case req.url.match(/\/resources$/) && method === 'POST':
          return handleCreateResource();
        case req.url.match(/\/resources$/) && method === 'GET':
          return handleGetFinancialResources();
        case req.url.match(/\/forum\/\d$/) && method === 'GET':
          return handleGetForumPost();
        case req.url.match(/\/forum\/\d\/answers$/) && method === 'GET':
          return handleGetForumPostAnswers();
        case req.url.match(/\/forum$/) && method === 'GET':
          return handleGetForumPosts();
        case req.url.match(/\/forum\/\d\/answers$/) && method === 'POST':
          return handleCreateForumPostAnswer();
        case req.url.match(/\/forum$/) && method === 'POST':
          return handleCreateForumPost();
        default:
          return okRequest('');
      }
    }

    function handleCreateResource() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const bodyRequest: FinancialResource = body;
      bodyRequest.id = getNewIdForSet(applicationState.forumResources);
      applicationState.forumResources = applicationState.forumResources.concat([bodyRequest]);
      return okRequest(bodyRequest);
    }

    function handleCreateForumPost() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const bodyRequest: ForumPost = body;
      bodyRequest.id = getNewIdForSet(applicationState.forumPosts);
      applicationState.forumPosts = applicationState.forumPosts.concat([bodyRequest]);
      return okRequest(bodyRequest);
    }

    function handleCreateForumPostAnswer() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);
      const bodyRequest: ForumAnswer = body;
      bodyRequest.postId = id;
      bodyRequest.id = getNewIdForSet(applicationState.forumAnswers);
      applicationState.forumAnswers = applicationState.forumAnswers.concat([bodyRequest]);
      return okRequest(bodyRequest);
    }

    function handleGetForumPostAnswers() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);
      const answers = applicationState.forumAnswers.filter(x => x.postId === id);
      if (!answers) {
        return badRequest('Invalid id!');
      }
      return okRequest(answers);
    }

    function handleGetForumPost() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 1]);
      const post = applicationState.forumPosts.find(x => x.id === id);
      if (!post) {
        return badRequest('Invalid id!');
      }
      return okRequest(post);
    }

    function handleGetFinancialResources() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      console.log('here');
      console.log(applicationState.forumResources);
      return okRequest(applicationState.forumResources);
    }

    function handleGetForumPosts() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      return okRequest(applicationState.forumPosts);
    }

    function handleCreateChildRequest() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);
      const requestBody: ChildRequest = body;
      requestBody.id = getNewIdForSet(applicationState.familyChildRequests[id]);
      requestBody.status = ChildRequestStatus.Pending;
      applicationState.familyChildRequests[id] = applicationState.familyChildRequests[id].concat([requestBody]);
      return okRequest(requestBody);
    }

    function handleGetUserFinancialStatements() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const idUser = Number(urlParts[urlParts.length - 1]);
      if (!idUser) {
        return badRequest('Invalid request format!');
      }
      return okRequest(applicationState.financialStatements.filter(x => x.userId === idUser));
    }

    function handleDeleteFinancialStatements() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const idStatement = Number(urlParts[urlParts.length - 1]);
      if (idStatement !== 0 && !idStatement) {
        return badRequest('Invalid request format!');
      }
      applicationState.financialStatements = applicationState.financialStatements.filter(x => x.id !== idStatement);
      console.log(applicationState.financialStatements);
      return okRequest('');
    }

    function handleUpdateFamilyFinancialStatements() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const idStatement = Number(urlParts[urlParts.length - 1]);
      if (!idStatement) {
        return badRequest('Invalid request format!');
      }
      const financialStatement: FinancialStatement = body;
      const statement = applicationState.financialStatements.find(x => x.id === idStatement);
      statement.date = financialStatement.date || statement.date;
      statement.description = financialStatement.description || statement.description;
      statement.amount = financialStatement.amount || statement.amount;
      statement.target = financialStatement.target || statement.target;
      statement.type = financialStatement.type || statement.type;
      return okRequest(financialStatement);
    }

    function handleCreateFamilyFinancialStatements() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);
      if (!id) {
        return badRequest('Invalid request format!');
      }
      const financialStatement: FinancialStatement = body;
      financialStatement.id = getNewIdForSet(applicationState.financialStatements);
      applicationState.financialStatements = applicationState.financialStatements.concat([financialStatement]);
      return okRequest(financialStatement);
    }

    function handleGetFamilyFinancialStatements() {
      if (!applicationState.currentSession) {
        return unauthorizedRequest();
      }
      const urlParts = url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);
      if (!id) {
        return badRequest('Invalid request format!');
      }
      return okRequest(applicationState.financialStatements.filter(x => x.familyId === id));
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
