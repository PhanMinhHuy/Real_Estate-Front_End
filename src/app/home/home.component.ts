import { AuthService } from './../services/auth.service';
import { Role } from './../models/role';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: User;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        location.assign('/error');
      }
    );
    this.authService.getCurrentUser();
  }

  goToPostForm(content): void {
    if (this.user === null) {
      this.modalService.open(content);
    } else {
      this.router.navigateByUrl('/post-form');
    }
  }

  isAdmin(): boolean {
    return this.authService.hasRole(Role.ADMIN);
  }

  isMod(): boolean {
    return this.authService.hasRole(Role.MOD);
  }

  logout(): void {
    this.authService.logout();
    this.authService.getCurrentUser();
  }
}
