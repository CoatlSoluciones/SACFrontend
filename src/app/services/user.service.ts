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

  ngOnInit(){ }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseService}${'/users'}`);
  }

  getUser(userId: number): Observable<User[]> { 
    return this.http.get<User[]>(`${environment.baseService}${'/users'}/${userId}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseService}${'/users'}/${userId}`);
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(`${environment.baseService}${'/users'}`, user);
  }

  updateUser(userId: number, user: User): Observable<void> {
    return this.http.patch<void>(`${environment.baseService}${'/users'}/${userId}`, user);
  }



}