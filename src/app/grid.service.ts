import { Injectable } from '@angular/core';
import { Grid } from './grid/grid.model';
import { Ball, BallState, BallColors, BallColor } from './ball/ball.model';
import { Cell } from './cell/cell.model';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private _data: Grid;
  private _history: Cell[][][] = [];
  private _cells: Cell[][];
  private _currentBall: Ball;
  private _currentCell: Cell;

  constructor() {
    this._data = new Grid();
    this._cells = this._data.snapshot;
  }

  public get cells(): Cell[][] {
    return this._cells;
  }

  public set currentBall(ball: Ball) {
    if (this._currentBall) {
      this._currentBall.state = BallState.idle;
    }
    if (this._currentBall !== ball) {
      this._currentBall = ball;
      this._currentBall.state = BallState.active;
    } else {
      this._currentBall = null;
    }
    this._currentCell = null;
  }

  public get currentBall(): Ball {
    return this._currentBall;
  }

  public set currentCell(cell: Cell) {
    this._currentCell = cell;
  }

  public get currentCell(): Cell {
    return this._currentCell;
  }

  public next(): boolean {

    const snapshot = this._data.snapshot;
    const emptyCellsFlat = this._cells
      .reduce((result, row) => result.concat(row), [])
      .filter(cell => cell.ball === null);

    if (emptyCellsFlat.length < 3) {
      return false;
    }
    let i = 3;
    while (i) {
      const r = Math.floor(Math.random() * emptyCellsFlat.length);
      const randomCell = emptyCellsFlat[r];
      randomCell.ball = new Ball(
        randomCell.state,
        BallColors[Math.floor(BallColors.length * Math.random())] as BallColor
      );
      emptyCellsFlat.splice(r, 1);
      i--;
    }
    this._history.push(snapshot);
    return true;
  }

  public randomize() {
    this._data.randomize();
    this._cells = this._data.snapshot;
  }
}
