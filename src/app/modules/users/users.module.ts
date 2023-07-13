import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { AdminusersComponent } from './admin-users/admin-users.component';

@NgModule({
  declarations: [
    AgePipe,
    AdminusersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
