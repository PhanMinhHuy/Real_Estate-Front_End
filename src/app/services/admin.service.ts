import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly API = 'http://localhost:8080/api/v1/admins/';
  constructor(private http: HttpClient) {}

  getAdmins(page): Observable<List<User>> {
    return this.http.get<List<User>>(this.API + '?page=' + page);
  }

  createAccount(user): Observable<any> {
    return this.http.post<any>(this.API, user);
  }

  blockAdmin(id): Observable<any> {
    return this.http.post<any>(this.API + id + '/block', {});
  }

  unblockAdmin(id): Observable<any> {
    return this.http.post<any>(this.API + id + '/unblock', {});
  }

  deleteAdmin(id): Observable<any> {
    return this.http.delete<any>(this.API + id + '/delete', {});
  }
}
