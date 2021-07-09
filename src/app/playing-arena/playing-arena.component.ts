import { Component, OnInit, HostListener } from '@angular/core';
//import { Store } from '@ngrx/store';
import { Key } from 'ts-key-enum';
import { GameEngineService } from '../game-engine.service';
import { Level, Facing } from '../level';
import { LevelManagerService } from '../level-manager.service';

var eventDirectionMap = {};
eventDirectionMap[Key.ArrowRight] = Facing.right;
eventDirectionMap[Key.ArrowLeft] = Facing.left;
eventDirectionMap[Key.ArrowUp] = Facing.top;
eventDirectionMap[Key.ArrowDown] = Facing.bottom;

@Component({
  selector: 'app-playing-arena',
  templateUrl: './playing-arena.component.html',
  styleUrls: ['./playing-arena.component.scss']
})
export class PlayingArenaComponent implements OnInit {
  level: Level;  
  stepCounter: number = 0;
  canUndo: boolean = false;
  canRedo: boolean = false;  

  constructor(private levelManagerService: LevelManagerService, 
              public gameEngineService: GameEngineService) {
  }

  ngOnInit() {
    this.gameEngineService.setLevel(this.levelManagerService.loadLevel());
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (eventDirectionMap.hasOwnProperty(event.key)) {
      this.gameEngineService.moveInDirection(eventDirectionMap[event.key]);
      this.refresh();
    }
  }  

  onBackward(): void {
    while (this.gameEngineService.commandProcessorService.canUndo()) {
      this.gameEngineService.commandProcessorService.undo();
    }
    this.refresh();
  }

  onForward(): void {
    while (this.gameEngineService.commandProcessorService.canRedo()) {
      this.gameEngineService.commandProcessorService.redo();
    }
    this.refresh();
  }

  onUndo(): void {
    this.gameEngineService.commandProcessorService.undo();
    this.refresh();
  }

  onRedo(): void {
    this.gameEngineService.commandProcessorService.redo();
    this.refresh();
  }

  refresh(): void {
    this.stepCounter = this.gameEngineService.getStepCount();
    this.canUndo = this.gameEngineService.commandProcessorService.canUndo();
    this.canRedo = this.gameEngineService.commandProcessorService.canRedo();
  }
}
