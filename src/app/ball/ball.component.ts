import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BallColor, BallState, Ball } from './ball.model';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnInit {

  @Input() data: Ball;
  @Output() clicked: EventEmitter<Ball> = new EventEmitter<Ball>();

  public BALL_STATE = BallState;
  public BALL_COLOR = BallColor;

  constructor() { }

  ngOnInit() {
  }
}
