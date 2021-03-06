import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[];
  post: Post;
  search = '';
  page = 0;
  pages: number[];
  first: boolean;
  last: boolean;
  userId: number;
  totalPages: number;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getPostsByUser();
  }

  getPostsByUser() {
    this.userId = this.tokenStorageService.getUser().id;
    this.userService.getPostsByUserId(this.userId, this.page, this.search).subscribe(data => {
      // @ts-ignore
      this.posts = data.content;
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.page = data.number;
      // @ts-ignore
      this.first = data.first;
      // @ts-ignore
      this.last = data.last;
      // @ts-ignore
      this.pages = new Array(data.totalPages);
    });
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getPostsByUser();
  }

  deletePost(post: Post): void {
    this.postService.getPostById(post.id).subscribe(data => {
      post = data;
    });
    post.status = false;
    this.postService.editPost(post, post.id).subscribe(data => {
      console.log(data);
    });
    this.modalService.dismissAll();
  }

  openModal(targetModal, post) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.post = post;
  }
}
