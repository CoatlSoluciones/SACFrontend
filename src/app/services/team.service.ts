import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/interfaces/team';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeamsList(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.baseService}/teams`);
  }
  
}
