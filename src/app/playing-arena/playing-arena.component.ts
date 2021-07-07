import { Component, OnInit, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommandProcessorService } from '../command-processor.service';
import { Level, Facing } from '../level';
import { LevelManagerService } from '../level-manager.service';

@Component({
  selector: 'app-playing-arena',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './playing-arena.component.html',
  styleUrls: ['./playing-arena.component.scss']
})
export class PlayingArenaComponent implements OnInit {
  level: Level;  
  stepCounter: number = 0;
  canUndo: boolean = false;
  canRedo: boolean = false;
  eventDirectionMap = {
    "ArrowRight" : Facing.right,
    "ArrowLeft" : Facing.left,
    "ArrowUp" : Facing.top,
    "ArrowDown": Facing.bottom
  }

  constructor(private levelManagerService: LevelManagerService, 
              private commandProcessorService: CommandProcessorService,  
              private changeDetectorRef: ChangeDetectorRef) { 

  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.eventDirectionMap.hasOwnProperty(event.key)) {
      this.level.moveInDirection(this.eventDirectionMap[event.key]);
      this.refresh();
    }
  }

  ngOnInit() {
    this.level = this.levelManagerService.loadLevel(this.commandProcessorService);
  }

  onBackward(): void {
    while (this.commandProcessorService.canUndo()) {
      this.commandProcessorService.undo();
    }
    this.refresh();
  }

  onForward(): void {
    while (this.commandProcessorService.canRedo()) {
      this.commandProcessorService.redo();
    }
    this.refresh();
  }

  onUndo(): void {
    this.commandProcessorService.undo();
    this.refresh();
  }

  onRedo(): void {
    this.commandProcessorService.redo();
    this.refresh();
  }

  refresh(): void {
    this.stepCounter = this.level.getStepCount();
    this.canUndo = this.commandProcessorService.canUndo();
    this.canRedo = this.commandProcessorService.canRedo();
    this.changeDetectorRef.detectChanges();
  }
}
