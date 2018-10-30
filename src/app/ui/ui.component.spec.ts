import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiComponent } from './ui.component';
import { By } from '@angular/platform-browser';
import { BallColor } from '../ball/ball.model';
import { BallComponent } from '../ball/ball.component';

describe('UiComponent', () => {
  let component: UiComponent;
  let fixture: ComponentFixture<UiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiComponent, BallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly render next balls colors', () => {
    component.data = {
      nextColors: [ BallColor.red, BallColor.green, BallColor.blue ],
      score: 0
    };
    fixture.detectChanges();
    const ballEls = fixture.debugElement.queryAll(By.css('.ball'));
    expect(ballEls.length).toEqual(3);
    for (let i = 0; i < 3; i++) {
      expect(ballEls[i].classes[component.data.nextColors[i]]).toBeTruthy();
    }
  });

  it('should properly render scores', () => {
    component.data = {
      nextColors: [ BallColor.red, BallColor.green, BallColor.blue ],
      score: 1000
    };
    fixture.detectChanges();
    let scoreEl = fixture.debugElement.query(By.css('.ui__score'));
    expect(scoreEl.nativeElement.textContent).toEqual('1000');
    component.data = {
      nextColors: [ BallColor.red, BallColor.green, BallColor.blue ],
      score: 2000
    };
    fixture.detectChanges();
    scoreEl = fixture.debugElement.query(By.css('.ui__score'));
    expect(scoreEl.nativeElement.textContent).toEqual('2000');
  });
});