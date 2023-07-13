import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/user';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor (private http: HttpClient) { }

  ngOnInit(){
  }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseService}${'/users'}`);
  }

}