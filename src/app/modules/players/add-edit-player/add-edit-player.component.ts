import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';
import { Player } from 'src/interfaces/player';
import { User } from 'src/interfaces/user';


export interface State {
  flag: string;
  name: string;
  population: string;
}

export interface Food {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-add-edit-player',
  templateUrl: './add-edit-player.component.html',
  styleUrls: ['./add-edit-player.component.scss']
})
export class AddEditPlayerComponent implements OnInit {

  foods: Food[] = [
    //{value: 'empty', viewValue: ''},
    { value: 'steak-0', viewValue: '1' },
    { value: 'pizza-1', viewValue: '2' },
    { value: 'tacos-2', viewValue: '3' },
  ];

  selectedFood = ''//this.foods[0].value;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];


  displayedColumnsUsers: string[] = ['id', 'name', 'action'];
  //displayedColumnsUsers: string[] = ['id', 'name', 'birthday', 'gender', 'action'];
  displayedColumnsPlayers: string[] = ['id', 'name', 'action'];
  //displayedColumnsPlayers: string[] = ['id', 'name', 'number', 'rol', 'action'];

  //dataSource = ELEMENT_DATA;
  dataSourceUsers = new MatTableDataSource<any>;
  dataSourcePlayers = new MatTableDataSource<any>;

  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;

  listUsers: any[] = [];
  listPlayers: any[] = [];
  //listUsers: User[] = [];
  //listUsersTemp: any[] = [];
  //listPlayers: Player[] = [];
  //listPlayersTemp: any[] = [];


  //genders: Gender[] = [];
  //states: State[] = [];
  form: FormGroup;
  operation: string = 'Agregar ';
  playerId: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddEditPlayerComponent>,
    private fb: FormBuilder,
    private _snackbar: MatSnackBar,
    private _playerService: PlayerService,
    private _userService: UserService,
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
    this.playerId = data.playerId;

    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );

  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }



  ngOnInit(): void {
    this.getUserList();
    this.getPlayerList();
    //this.isEdit(this.playerId);
    //this.getUser(1);
    //this.loadGenders();
    //this.loadStates();
  }

  /*   loadGenders() {
      this._genderService.getGenders().subscribe(data => {
        this.genders = data;
      });
    } */

  /*   loadStates() {
      this._stateService.getStates().subscribe(data => {
        this.states = data;
      });
    } */

  cancel() {
    this.dialogRef.close();
  }

  isEdit(playerId: number | undefined) {
    if (playerId !== undefined) {
      this.operation = 'Editar ';
      this.getUser(playerId);
    }
  }

  getUser(playerId: number) {
    this._playerService.getPlayerById(playerId).subscribe((result: any) => {
      console.log(result);
    })
    /*     this._playerService.getUser(playerId).subscribe((result: any) => {
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
        }); */
  }

  addEditPlayer() {
    const newPlayer: any = {
      /*       first: this.form.value.first,
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
            birthday: this.form.value.birthday */
    }


    if (this.form.valid) {
      /*       if (this.playerId == undefined) {
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
                  this._snackbar.open('Error al crear el usuario', '', {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                  });
                }
              });
            } else {
              this._userService.updateUser(this.playerId, newUser).subscribe({
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
                  this._snackbar.open('Error al actualizar el usuario', '', {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                  });
                }
              });
            } */
      this.dialogRef.close();
    }
  }

  getUserList() {
    this._userService.getUsersList().subscribe({
      next: (result: any) => {
        if (result.success) {
          this.listUsers = result.data.map((user: any) => {
            return {
              id: user.id,
              name: user.name.first + ' ' + user.name.last + ' ' + user.name.secondLast,
            }
          });
          //console.log(this.listUsers);
          //this.listUsersTemp = this.listUsers;
          //console.log(this.listUsersTemp);
          //console.log(this.listUsers);
          this.dataSourceUsers = new MatTableDataSource(this.listUsers);
          //console.log(this.dataSourceUsers);
          //console.log(this.dataSourceUsers);
          //this.loading = false;
          //this.isError = false;
        }
      },
      error: (error) => {
        //this.loading = false;
        //this.isError = true;
      }
    });
  }

  getPlayerList() {
    this._playerService.getPlayerList().subscribe({
      next: (result: any) => {
        if (result.success) {
          this.listPlayers = result.data.map((player: any) => {
            return {
              id: player.userId,
              name: player.name.first + ' ' + player.name.last + ' ' + player.name.secondLast,
            }
          });
          //this.listPlayersTemp = this.listPlayers;
          //console.log(this.listPlayers);
          this.dataSourcePlayers = new MatTableDataSource(this.listPlayers);
          //this.loading = false;
          //this.isError = false;
        }
      },
      error: (error) => {
        //this.loading = false;
        //this.isError = true;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsers.filter = filterValue.toLowerCase().trim();
  }

  removeUser(userId: number) {
    //console.log(this.listUsers);
    let i = this.listUsers.findIndex(elemento => elemento.id === userId);
    //console.log(i);
    if (i !== -1) {
      console.log(this.listUsers[i]);
      this.listPlayers.push(this.listUsers[i]);
      this.dataSourcePlayers = new MatTableDataSource(this.listPlayers);
      this.listUsers.splice(i, 1);
      //console.log(this.listUsersTemp);
      this.dataSourceUsers = new MatTableDataSource(this.listUsers);
      //console.log(this.listUsersTemp[i-1]);
      //this.listPlayersTemp.push(this.listUsersTemp[i][1]);
      
    }
    //console.log(this.listUsers);
  }

  removePlayer(playerId: number) {
    let i = this.listPlayers.findIndex(elemento => elemento.id === playerId);
    if (i !== -1) {
      this.listUsers.push(this.listPlayers[i]);
      this.dataSourceUsers = new MatTableDataSource(this.listUsers);
      this.listPlayers.splice(i, 1);
      this.dataSourcePlayers = new MatTableDataSource(this.listPlayers);
      //console.log(this.listPlayers[i]);
    }
    //console.log(this.listPlayers);
  }

  addUserToPlayer(userId: number) { }

}
