import { Injectable } from '@angular/core';
import { Grid } from './grid/grid.model';
import { Ball, BallState } from './ball/ball.model';
import { Cell } from './cell/cell.model';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private _data: Grid;
  private _history: Cell[][][] = [];
  private _currentBall: Ball;
  private _cells: Cell[][];

  constructor() {
    this._data = new Grid();
    this._cells = this._data.snapshot;
  }

  public get cells(): Cell[][] {
    return this._cells;
  }

  public setCurrentBall(ball: Ball): Ball {
    if (this._currentBall === ball) {
      return null;
    }
    if (this._currentBall) {
      this._currentBall.state = BallState.idle;
    }
    this._currentBall = ball;
    this._currentBall.state = BallState.active;
    return this._currentBall;
  }

  public next() {
    this._history.push(this._cells);
  }

  public randomize() {
    this._data.randomize();
    this._cells = this._data.snapshot;
  }
}
