import { Component, OnInit } from '@angular/core';
import { CommandProcessorService } from '../command-processor.service';
import { Level } from '../level';
import { LevelManagerService } from '../level-manager.service';
import { TileType } from '../tiles';

@Component({
  selector: 'app-level-editor',
  templateUrl: './level-editor.component.html',
  styleUrls: ['./level-editor.component.scss']
})
export class LevelEditorComponent implements OnInit {
  level: Level;
    
  constructor(private commandProcessorService: CommandProcessorService, private levelManagerService: LevelManagerService) { }

  ngOnInit() {
    this.level = this.levelManagerService.loadEmptyLevelForEditing();
  }

}
