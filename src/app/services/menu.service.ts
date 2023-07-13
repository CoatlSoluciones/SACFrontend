import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  // Cargar menú desde un archivo JSON
  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('./assets/data/menu.json');
  }

}
