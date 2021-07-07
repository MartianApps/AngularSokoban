import { Component, OnInit } from '@angular/core';
import { TileType, TileType2 } from '../tiles';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent implements OnInit {
  draggableTileTypes: TileType[] = [
    TileType2.Box,
    TileType2.Exit,
    TileType2.Floor,
    TileType2.Player,
    TileType2.Wall];
  constructor() { }

  ngOnInit(): void {
  }

}
