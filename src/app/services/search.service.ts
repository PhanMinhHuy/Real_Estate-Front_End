import { List } from '../models/list';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly API = 'http://localhost:8080/api/v1/posts';
  private postList: List<Post>;
  private currentOption = {};
  private listPostSubject: BehaviorSubject<List<Post>> = new BehaviorSubject<
    List<Post>
  >(null);
  listPost$: Observable<List<Post>> = this.listPostSubject.asObservable();
  constructor(private http: HttpClient) {}
  searchAll(option = {}): void {
    this.currentOption = option;
    this.http.post<List<Post>>(`${this.API}/searchAll`, option).subscribe(
      (postList) => {
        this.postList = postList;
        this.updatePostList();
      },
      (err) => {
        location.assign('/error');
      }
    );
  }

  searchPendingPosts(option = {}, page): void {
    this.currentOption = option;
    this.http
      .post<List<Post>>(`${this.API}/searchPending?page=${page}`, option)
      .subscribe(
        (postList) => {
          this.postList = postList;
          this.updatePostList();
        },
        (err) => {
          location.assign('/error');
        }
      );
  }

  searchApprovedPosts(option = {}, page): void {
    this.currentOption = option;
    this.http
      .post<List<Post>>(`${this.API}/searchApproved?page=${page}`, option)
      .subscribe(
        (postList) => {
          this.postList = postList;
          this.updatePostList();
        },
        (err) => {
          location.assign('/error');
        }
      );
  }

  jumpToPage(page) {
    this.http
      .post<List<Post>>(
        `${this.API}/searchAll?page=${page}`,
        this.currentOption
      )
      .subscribe(
        (postList) => {
          this.postList = postList;
          this.updatePostList();
        },
        (err) => {
          location.assign('/error');
        }
      );
  }

  private updatePostList() {
    this.listPostSubject.next(this.postList);
  }
}
