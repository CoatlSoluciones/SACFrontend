import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/interfaces/team';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss']
})
export class AdminTeamsComponent implements OnInit {

  listTeams: Team[] = [];
  loading = true;
  isError = false;

  constructor(private _teamService: TeamService) { }

  ngOnInit() {
    this.getTeamList();
  }

  getTeamList() {
    this._teamService.getTeamsList().subscribe({
      next: (result: any) => {
        if (result.success) {
          this.listTeams = result.data.map((team: any) => {
            return {
              id: team.id,
              name: team.name,
              coach: `${team.coach.first} ${team.coach.middle} ${team.coach.last} ${team.coach.secondLast}`,
              user_created: team.user_created,
              created: team.created,
              user_deleted: team.user_deleted,
              deleted: team.deleted
            }
          });
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
