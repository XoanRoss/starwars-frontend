import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConfig} from '../../config/api.config';
import {PlanetsResponse} from './planets.model';
import {PlanetFilter} from '../../models/filters.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private baseUrl = ApiConfig.planets;

  constructor(private http: HttpClient) {
  }

  getPlanets(page: number, sortBy: string = 'id', sortDir: string = 'asc', filter: PlanetFilter | null = null): Observable<PlanetsResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);
    return this.http.post<PlanetsResponse>(`${this.baseUrl}`, filter, {params});
  }
}
