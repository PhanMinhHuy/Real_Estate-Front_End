import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ViewCountStatistic} from '../models/view-count-statistic';

@Injectable({
  providedIn: 'root',
})
export class ViewCountStatisticService {
  private readonly API = 'http://localhost:8080/api/v1/viewCountStatistic';

  constructor(private http: HttpClient) {}

  getViewCountStatistics(): Observable<ViewCountStatistic[]> {
    return this.http.get<ViewCountStatistic[]>(this.API);
  }

  createViewCountStatistic(viewCountStatistic: ViewCountStatistic): Observable<ViewCountStatistic> {
    return this.http.post<ViewCountStatistic>(this.API, viewCountStatistic);
  }

  editViewCountStatistic(viewCountStatistic: ViewCountStatistic): Observable<ViewCountStatistic> {
    return this.http.patch<ViewCountStatistic>(`${this.API}/${viewCountStatistic.id}`, viewCountStatistic);
  }

  getLastViewCountStatistic(): Observable<ViewCountStatistic> {
    return this.http.get<ViewCountStatistic>(this.API + '/lastViewCountStatistic');
  }

  getListViewCountStatistic(dateStatistic): Observable<ViewCountStatistic[]> {
    return this.http.post<ViewCountStatistic[]>(this.API + '/listViewCountStatistic', dateStatistic);
  }
}
