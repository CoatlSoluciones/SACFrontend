import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})

export class AdminusersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listUsers: User[] = [];
  displayedColumns: string[] = ['name', 'gender', 'birthday', 'email', 'action'];
  loading = true;
  isError = false;
  dataSource = new MatTableDataSource<any>;

  constructor(private userService: UserService, private _snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.loadPages();
  }

  getUserList() {
    this.userService.getUsersList().subscribe({
      next: (result: any) => {
        if (result.success) {
          this.listUsers = result.data;
          console.log(this.listUsers);
          this.dataSource = new MatTableDataSource(this.listUsers);
          this.loading = false;
          this.isError = false;
        }
      },
      error: (error) => {
        this.loading = false;
        this.isError = true;
      }
    });
  }

  loadPages() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.listUsers);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 100);
    }, 400);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (result: any) => {
        if (result.success) {
          this.getUserList();
          this.loadPages();
          this._snackbar.open('El usuario se ha eliminado','', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      },
        error: (error) => {
          this._snackbar.open('Error al eliminar el usuario', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
    });
  }

  addEditUser(userId?: number) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      disableClose: true,
      data: {userId: userId},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserList();
      this.loadPages();
    });
  }

}