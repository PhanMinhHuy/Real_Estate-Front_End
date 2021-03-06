import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostImage} from '../models/post-image';

@Injectable({
  providedIn: 'root'
})
export class PostImageService {
  private readonly API = 'http://localhost:8080/api/v1/postImages';

  constructor(private http: HttpClient) { }

  getPostImages(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  createPostImage(postImage: PostImage): Observable<PostImage> {
    return this.http.post<PostImage>(this.API, postImage);
  }

  editPostImage(postImage: PostImage): Observable<PostImage> {
    return this.http.patch<PostImage>(`${this.API}/${postImage.id}`, postImage);
  }

  deletePostImage(id: number): Observable<PostImage> {
    return this.http.delete<PostImage>(`${this.API}/${id}`);
  }

  getPostImageById(id: number): Observable<PostImage> {
    return this.http.get<PostImage>(`${this.API}/${id}`);
  }
}
