import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/interfaces/player';

@Component({
  selector: 'app-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['./admin-players.component.scss']
})
export class AdminPlayersComponent implements OnInit {

  listPlayers: Player[] = [];
  loading = true;
  isError = false;

  constructor(private playerService: PlayerService, private _snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPlayerList();
  }

  getPlayerList() {
    this.playerService.getPlayerList().subscribe({
      next: (result: any) => {
        if (result.success) {
          this.listPlayers = result.data;
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

}
