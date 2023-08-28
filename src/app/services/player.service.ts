import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Player } from 'src/interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayerList(): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.baseService}/players`);
  }

  getPlayerById(playerId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.baseService}/players/${playerId}`);
  }

}
