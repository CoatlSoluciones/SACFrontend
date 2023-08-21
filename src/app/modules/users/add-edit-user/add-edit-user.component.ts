import { Binary } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenderService } from 'src/app/services/gender.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { Gender } from 'src/interfaces/gender';
import { State } from 'src/interfaces/state';
import { AdminusersComponent } from '../admin-users/admin-users.component';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  genders: Gender[] = [];
  states: State[] = [];
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
    private _genderService: GenderService,
    private _stateService: StateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.form = this.fb.group({
      first: ['', [Validators.required, Validators.maxLength(20)]],
      last: ['', Validators.required],
      secondLast: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required],
      street: ['', Validators.required],
      state: ['', Validators.required],
      town: ['', Validators.required],
      municipality: ['', Validators.required],
      birthday: [null, Validators.required]
    })
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.isEdit(this.userId);
    this.loadGenders();
    this.loadStates();
  }

  loadGenders() {
    this._genderService.getGenders().subscribe(data => {
      this.genders = data;
    });
  }

  loadStates() {
    this._stateService.getStates().subscribe(data => {
      this.states = data;
    });
  }

  cancel() {
    this.dialogRef.close();
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
        last: result.data.name.last,
        secondLast: result.data.name.secondLast,
        email: result.data.email,
        phone: result.data.phone,
        postalCode: result.data.address.postalCode,
        street: result.data.address.street,
        state: result.data.address.state,
        town: result.data.address.town,
        municipality: result.data.address.municipality,
        gender: result.data.gender,
        birthday: result.data.birthday
      });
    });
  }

  addEditUser() {
    const newUser: any = {
      first: this.form.value.first,
      last: this.form.value.last,
      secondLast: this.form.value.secondLast,
      email: this.form.value.email,
      phone: this.form.value.phone,
      gender: this.form.value.gender,
      postalCode: this.form.value.postalCode,
      street: this.form.value.street,
      state: this.form.value.state,
      town: this.form.value.town,
      municipality: this.form.value.municipality,
      birthday: this.form.value.birthday
    }


    if (this.form.valid) {
      //this.dialogRef.close();
      if (this.userId == undefined) {
        //this.dialogRef.close();
        console.log(newUser);
        this._userService.addUser(newUser).subscribe({
          next: (result: any) => {
            if (result.success) {
              this.dialogRef.close();
              this._snackbar.open('El usuario se ha creado exitosamente', '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            }
          },
          error: (error) => {
            //this.dialogRef.close();
            this._snackbar.open('Error al crear el usuario', '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        });
        //this.dialogRef.close();
      } else {
        //this.dialogRef.close();
        this._userService.updateUser(this.userId, newUser).subscribe({
          next: (result: any) => {
            console.log(newUser);
            if (result.success) {
              this.dialogRef.close();
              this._snackbar.open('El usuario se ha actualizado exitosamente', '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            }
          },
          error: (error) => {
            //this.dialogRef.close();
            this._snackbar.open('Error al actualizar el usuario', '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        });
        //this.dialogRef.close();
      }
      this.dialogRef.close();
    }
    //this.dialogRef.close();
  }

}
