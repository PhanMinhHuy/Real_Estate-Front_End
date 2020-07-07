import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[];
  page = 0;
  pages: number[];
  search = '';

  constructor(
    private postService: PostService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPostsByUser();
  }

  getPostsByUser() {
    this.activatedRoute.params.subscribe(next => {
      this.userService.getPostsByUserId(next.id, this.page, this.search).subscribe(data => {
        // @ts-ignore
        this.posts = data.content;
        console.log(data);
        // @ts-ignore
        this.pages = new Array(data.totalPages);
        console.log('search is: ' + this.search);
      });
    });
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getPostsByUser();
  }

  deletePost(post: Post): void {
    if (confirm('Bạn có muốn xóa bài đăng này không?')) {
      this.postService.getPostById(post.id).subscribe(data => {
        post = data;
      });
      post.status = false;
      this.postService.editPost(post, post.id).subscribe(data => {
        console.log(data);
      });
    }
  }
}
