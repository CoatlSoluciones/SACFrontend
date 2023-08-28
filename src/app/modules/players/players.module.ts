import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { AdminPlayersComponent } from './admin-players/admin-players.component';
import { CardPlayerComponent } from './card-player/card-player.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditPlayerComponent } from './add-edit-player/add-edit-player.component';

@NgModule({
  declarations: [
    AdminPlayersComponent,
    CardPlayerComponent,
    AddEditPlayerComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    SharedModule
  ]
})
export class PlayersModule { }
