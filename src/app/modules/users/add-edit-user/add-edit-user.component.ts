import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  genders: String[] = ['Masculino', 'Femenino'];
  form: FormGroup;
  operation: string = 'Agregar ';
  userId: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddEditUserComponent>, 
    private fb: FormBuilder, 
    private _userService: UserService, 
    private _snackbar: MatSnackBar, 
    private router: Router,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.form = this.fb.group({
      first: ['', [Validators.required, Validators.maxLength(20)]],
      last: ['', Validators.required],
      middle: [''],
      secondLast: ['', Validators.required],
      gender: [null, Validators.required],
      email: ['', Validators.required],
      birthday: [null, Validators.required]
    })

    this.userId = data.userId;
  }

  ngOnInit(): void { 
    this.isEdit(this.userId);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  isEdit(userId: number | undefined) {
    if (userId !== undefined) {
      this.operation = 'Editar ';
      this.getUser(userId);
    }
  }

  getUser(userId: number) {
    this._userService.getUser(userId).subscribe((result: any) => {
      this.form.patchValue({
        first: result.data.name.first,
        middle: result.data.name.middle,
        last: result.data.name.last,
        secondLast: result.data.name.secondLast,
        email: result.data.email,
        gender: result.data.gender,
        birthday: new Date(result.data.birthday)
      });
    });
  }

  addEditUser() {
    const newUser: any = {
      first: this.form.value.first,
      middle: this.form.value.middle,
      last: this.form.value.last,
      secondLast: this.form.value.secondLast,
      email: this.form.value.email,
      gender: this.form.value.gender,
      birthday: this.form.value.birthday.toISOString().slice(0,10),
      userCreated: 1
    }
    
    if (this.form.valid) {
      //let user = this.form.value;
      if (this.userId == undefined) {
              this._userService.addUser(newUser).subscribe((result: any) => {
        if (result.success) {
          this._snackbar.open('El usuario se ha creado exitosamente', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate([
            "/users/admin"
          ]);
        }
      })
      } else {
        this._userService.updateUser(this.userId, newUser).subscribe((result: any) => {
          if (result.success) {
            this._snackbar.open('El usuario se ha actualizado exitosamente', '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.router.navigate([
              "/users/admin"
            ]);
          }
        });
      }
      this.dialogRef.close(true);
    }
  }

}
