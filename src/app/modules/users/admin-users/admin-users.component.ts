import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { User } from 'src/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})

export class AdminusersComponent implements OnInit {

  // Crear un observable para almacenar el último valor de la lista de usuarios.
  _users$ = new BehaviorSubject<User[]>([]);
  listUsers: User[] = [];
  displayedColumns: string[] = ['name', 'gender', 'birthday', 'email', 'action'];
  dataSource = new MatTableDataSource<any>;
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    // Ejecutar este método cuando se crea el componente.
    this.getUserList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Obtener todos los usuarios registrados
  getUserList() {
    this.userService.getUsersList().subscribe({
      next: (result: any) => {
        if (result.success) {
          this._users$.next(result.data);
          this.dataSource = new MatTableDataSource(this._users$.value);
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

}

