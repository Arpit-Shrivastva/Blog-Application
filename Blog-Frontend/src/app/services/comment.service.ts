import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  endPoint = "http://localhost:8081/api/v1/comment";

  // Post a comment
  postComment(postId: number, postedBy: string, content: string): Observable<any> {
    const params = new HttpParams()
      .set('postId', postId.toString())
      .set('postedBy', postedBy)
      .set('content', content);

    return this.httpClient.post(`${this.endPoint}/create`, {}, { params });
  }

  // Get comments for a post
  getComment(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.endPoint}/${postId}`);
  }


}
