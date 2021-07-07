import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorArenaComponent } from './editor-arena.component';

describe('EditorArenaComponent', () => {
  let component: EditorArenaComponent;
  let fixture: ComponentFixture<EditorArenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorArenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
