import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.usersService.getUsersList().subscribe((res: any) => {
      console.log(res.data);
    });

  }
  
}