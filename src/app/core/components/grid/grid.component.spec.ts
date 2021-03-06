import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { CellComponent } from '../cell/cell.component';
import { BallComponent } from '../ball/ball.component';
import { By } from '@angular/platform-browser';
import { UiComponent } from '../ui/ui.component';
import { GridAnimationComponent } from '../grid-animation/grid-animation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TurnData, GridAnimationType } from '../../shared';
import * as Grid from '../../shared/grid';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule ],
      declarations: [
        GridComponent,
        CellComponent,
        BallComponent,
        GridAnimationComponent,
        UiComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly dispatch cell click', () => {
    const cells = Grid.getRandomGrid();
    component.turn = { cells } as TurnData;
    fixture.detectChanges();
    const cellEls = fixture.debugElement.queryAll(By.css('app-cell'));
    expect(cellEls.length).toBe(component.turn.cells.length);

    const onClickSpy = spyOn(component, 'cellClicked').and.callThrough();

    for (let i = 0; i < cellEls.length; i++) {
      const cellEl = cellEls[i];
      cellEl.nativeElement.click();
      fixture.detectChanges();
    }
    expect(onClickSpy).toHaveBeenCalledTimes(component.turn.cells.length);
  });

  it('should block input when animation is playing', (done) => {
    const completedSpy = spyOn(component, 'animationCompleted').and.callFake(() => {
      expect(completedSpy).toHaveBeenCalledTimes(1);
      done();
    });
    component.animation = [ { type: GridAnimationType.None } ];
    fixture.detectChanges();
  });
});
