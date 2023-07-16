import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { AdminTeamsComponent } from './admin-teams/admin-teams.component';
import { CardTeamComponent } from './card-team/card-team.component';
import { SharedModule } from 'src/app/shared/shared.module';
//import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AdminTeamsComponent,
    CardTeamComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    //MatCardModule
    SharedModule
  ]
})
export class TeamsModule { }
