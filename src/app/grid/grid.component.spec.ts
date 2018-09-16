import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { CellComponent } from '../cell/cell.component';
import { BallComponent } from '../ball/ball.component';
import { By } from '@angular/platform-browser';
import { GridServiceMocked } from '../grid-mocked.service';
import { GridService } from '../grid.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  const gridServiceMockup: GridServiceMocked = new GridServiceMocked();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        GridComponent,
        CellComponent,
        BallComponent
      ],
      providers: [
        {
          provide: GridService,
          useValue: gridServiceMockup
        }
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

  it('should properly dispatch ball click', () => {
    component.randomize();
    fixture.detectChanges();

    const cellClickedSpy = spyOn(component, 'cellClicked').and.callThrough();
    const buttonClickedSpy = spyOn(component, 'ballClicked').and.callThrough();

    const ballEls = fixture.debugElement.queryAll(By.css('.ball'));
    const cellEls = fixture.debugElement.queryAll(By.css('app-cell'));
    for (let i = 0; i < ballEls.length; i++) {
      ballEls[i].nativeElement.click();
      fixture.detectChanges();
      cellEls[i].nativeElement.click();
      fixture.detectChanges();
    }
    expect(buttonClickedSpy).toHaveBeenCalledTimes(ballEls.length);
    expect(cellClickedSpy).toHaveBeenCalledTimes(cellEls.length);
  });
});
