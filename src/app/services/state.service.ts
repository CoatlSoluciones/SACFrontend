import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from 'src/interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<State[]>('./assets/data/state.json');
  }
}
