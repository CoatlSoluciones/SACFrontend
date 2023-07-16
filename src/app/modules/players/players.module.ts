import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { AdminPlayersComponent } from './admin-players/admin-players.component';
import { CardPlayerComponent } from './card-player/card-player.component';
import { SharedModule } from 'src/app/shared/shared.module';

//import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AdminPlayersComponent,
    CardPlayerComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    SharedModule,
    //MatCardModule
  ]
})
export class PlayersModule { }
