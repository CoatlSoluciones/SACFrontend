import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/interfaces/team';

@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrls: ['./card-team.component.scss']
})
export class CardTeamComponent implements OnInit {

  @Input() team!: Team;

  constructor() { }

  ngOnInit(): void {
    
  }
}
