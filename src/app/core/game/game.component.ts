import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GridService } from '../grid.service';
import { Grid } from '../../shared/Grid';
import { ITurnData } from 'src/app/shared/TurnData';
import { IGridAnimation } from 'src/app/shared/GridAnimation';

@Component({
  selector: 'app-game',
  template: `
    <app-ui [data]="output$ | async"></app-ui>
    <app-grid
      [data]="output$ | async"
      [animation]="animation$ | async"
      (input)="onInput($event)"></app-grid>
  `,
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  output$: Observable<ITurnData>;
  animation$: Observable<IGridAnimation>;

  constructor(
    private _grid: GridService
  ) {}

  ngOnInit() {
    this.output$ = this._grid.output$;
    this.animation$ = this._grid.animation$;
  }

  ngAfterViewInit() {
    this.next({ cells: Grid.getGrid(), score: 0, nextColors: [] });
  }

  onInput(data: ITurnData) {
    this.next(data);
  }

  private next(data: ITurnData) {
    this._grid.input$.next(data);
  }

}
