import { Component, OnInit } from '@angular/core';
import { TileType } from '../tiles';

@Component({
  selector: 'app-level-editor',
  templateUrl: './level-editor.component.html',
  styleUrls: ['./level-editor.component.scss']
})
export class LevelEditorComponent implements OnInit {
  tileTypes: TileType[] = [
    TileType.Box,
    TileType.Exit,
    TileType.Floor,
    TileType.Player,
    TileType.Wall];
  constructor() { }

  ngOnInit() {
  }

}
