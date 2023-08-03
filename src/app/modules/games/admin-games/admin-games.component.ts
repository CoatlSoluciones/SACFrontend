import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/interfaces/game';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.scss']
})
export class AdminGamesComponent {

  listGames: Game[] = [];
  loading = true;
  isError = false;

  constructor(private _gameService: GameService) { }

  ngOnInit() {
    this.getGameList();
  }

  getGameList() {
    this._gameService.getGameList().subscribe({
      next: (result: any) => {
        if (result.success) {
          this.listGames = result.data/* .map((game: any) => {
            return {
              id: game.id,
              name: game.name,
              referee: `${game.referee.first} ${game.referee.middle} ${game.referee.last} ${game.referee.secondLast}`,
              user_created: game.user_created,
              created: game.created,
              user_deleted: game.user_deleted,
              deleted: game.deleted
            } */
          }
          console.log(this.listGames);
          this.loading = false;
          this.isError = false;
        },
      error: (error) => {
        this.loading = false;
        this.isError = true;
      }
    });
  }
}
