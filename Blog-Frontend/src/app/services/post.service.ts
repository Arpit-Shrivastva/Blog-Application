import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  endPoint = "http://localhost:8081/api/v1/post";


  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.endPoint}/save`, post);
  }

  getAllPost(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.endPoint}/fetch`);
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.endPoint}/get/${id}`);
  }

  getlikeById(id: number): Observable<any> {
    return this.httpClient.put(`${this.endPoint}/${id}/like`,{});
  }

  searchByName(name: string): Observable<Post> {
    return this.httpClient.get<Post>(`${this.endPoint}/${name}`);
  }

}
