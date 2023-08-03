import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { Game } from 'src/interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGameList(): Observable<Game[]> {
  return this.http.get<Game[]>(`${environment.baseService}/games`);
  }
}
