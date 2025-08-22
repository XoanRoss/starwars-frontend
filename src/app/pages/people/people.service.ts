import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConfig} from '../../config/api.config';
import {PeopleResponse} from './people.model';
import {PeopleFilter} from '../../models/filters.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private baseUrl = ApiConfig.people;

  constructor(private http: HttpClient) {
  }

  getPeople(page: number, sortBy: string = 'id', sortDir: string = 'asc', filter: PeopleFilter | null = null): Observable<PeopleResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);
    return this.http.post<PeopleResponse>(`${this.baseUrl}`, filter, {params});
  }
}
