import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LevelEditorComponent } from './level-editor.component';

describe('LevelEditorComponent', () => {
  let component: LevelEditorComponent;
  let fixture: ComponentFixture<LevelEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
