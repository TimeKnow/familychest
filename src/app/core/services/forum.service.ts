import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ForumPost} from '../models/forum/forum-post.model';
import {Observable} from 'rxjs';
import {ForumAnswer} from '../models/forum/forum-answer.model';
import {FinancialResource} from '../models/forum/financial-resource.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getForumPosts(): Observable<ForumPost[]> {
    return this.http.get<ForumPost[]>('/api/forum', this.httpOptions);
  }

  getForumPost(id: number): Observable<ForumPost> {
    return this.http.get<ForumPost>('/api/forum/' + id, this.httpOptions);
  }

  getForumPostAnswers(id: number): Observable<ForumAnswer[]> {
    return this.http.get<ForumAnswer[]>('/api/forum/' + id + '/answers', this.httpOptions);
  }

  createForumPost(forumPost: ForumPost): Observable<ForumPost> {
    return this.http.post<ForumPost>('/api/forum', forumPost, this.httpOptions);
  }

  createForumAnswer(id: number, forumPost: ForumAnswer): Observable<ForumAnswer> {
    return this.http.post<ForumAnswer>('/api/forum/' + id + '/answers', forumPost, this.httpOptions);
  }

  getForumResources(): Observable<FinancialResource[]> {
    return this.http.get<FinancialResource[]>('/api/resources', this.httpOptions);
  }

  createForumResource(resource: FinancialResource): Observable<FinancialResource> {
    return this.http.post<FinancialResource>('/api/resources', resource, this.httpOptions);
  }
}
