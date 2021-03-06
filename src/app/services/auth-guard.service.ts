import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isActivated = false;
    const user = this.tokenStorageService.getUser();
    if (user) {
      user.roles.forEach((role) => {
        if (route.data.roles.includes(role.roleName)) {
          isActivated = true;
        }
      });
    }
    if (!isActivated) {
      this.router.navigateByUrl('login-admin');
    }
    return isActivated;
  }
}
