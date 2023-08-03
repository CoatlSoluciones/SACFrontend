import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/interfaces/player';
@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent implements OnInit{

  @Input() player!: Player;

  constructor() { }

  ngOnInit(): void { }

}
