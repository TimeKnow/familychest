import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Family} from '../models/family/family.model';
import {FamilyUser} from '../models/family/family-user.model';
import {AuthUser} from '../models/auth/auth-user.model';
import {ChildRequest} from '../models/family/child-request.model';
import {ChildRequestAction} from '../models/family/child-request-action';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>('/api/families', this.httpOptions);
  }

  getFamilyMembers(familyId: number): Observable<FamilyUser[]> {
    return this.http.get<FamilyUser[]>('/api/families/' + familyId, this.httpOptions);
  }

  getAvailableUserForFamily(): Observable<AuthUser[]> {
    return this.http.get<AuthUser[]>('/api/families/members', this.httpOptions);
  }

  generateCodeForChild(childEmail: string, familyId: number): Observable<string> {
    return this.http.post<string>('/api/families/' + familyId + '/generate-code', this.httpOptions);
  }

  addMemberToFamily(memberId: number, familyId: number, role: string): Observable<{}> {
    return this.http.post<{}>('/api/families/' + familyId, {member: memberId, role}, this.httpOptions);
  }

  createFamily(family: string): Observable<Family> {
    return this.http.post<Family>('/api/families', {family}, this.httpOptions);
  }

  getChildRequestForFamily(familyId: number): Observable<ChildRequest[]> {
    return this.http.get<ChildRequest[]>('/api/families/' + familyId + '/child-requests', this.httpOptions);
  }

  createChildRequestForFamily(childRequest: ChildRequest): Observable<ChildRequest> {
    return this.http.post<ChildRequest>('/api/families/' + childRequest.familyId + '/child-requests', childRequest, this.httpOptions);
  }

  changeChildRequestStatus(action: ChildRequestAction): Observable<{}> {
    return this.http.put<{}>('/api/families/' + action.familyId + '/child-requests', action, this.httpOptions);
  }
}
