import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersadminRoutingModule } from './usersadmin-routing.module';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersadminRoutingModule
  ]
})
export class UsersadminModule { }
