import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayingArenaComponent } from './playing-arena.component';

describe('PlayingArenaComponent', () => {
  let component: PlayingArenaComponent;
  let fixture: ComponentFixture<PlayingArenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingArenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
