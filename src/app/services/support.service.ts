import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Support} from '../models/support';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private readonly API = 'http://localhost:8080/api/v1/supports';

  constructor(private http: HttpClient) { }

  getSupports(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  createSupport(support: Support): Observable<Support> {
    return this.http.post<Support>(this.API, support);
  }

  editSupport(support: Support): Observable<Support> {
    return this.http.patch<Support>(`${this.API}/${support.id}`, support);
  }

  deleteSupport(id: number): Observable<Support> {
    return this.http.delete<Support>(`${this.API}/${id}`);
  }
}
