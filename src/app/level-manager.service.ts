import { Injectable } from '@angular/core';
import { Tile, ITile, TileType } from './tiles';
import { Level } from './level';
import { CommandProcessorService } from './command-processor.service';

@Injectable({
  providedIn: 'root'
})
export class LevelManagerService {
  //https://sokoban.info/?1_1
  private arena: Array<TileType[]> = [
    [" "," "," "," ","W","W","W","W","W"," "," "," "," "," "," "," "," "," "," "],
    [" "," "," "," ","W",".",".",".","W"," "," "," "," "," "," "," "," "," "," "],
    [" "," "," "," ","W","B",".",".","W"," "," "," "," "," "," "," "," "," "," "],
    [" "," ","W","W","W",".",".","B","W","W"," "," "," "," "," "," "," "," "," "],
    [" "," ","W",".",".","B",".","B",".","W"," "," "," "," "," "," "," "," "," "],
    ["W","W","W",".","W",".","W","W",".","W"," "," "," ","W","W","W","W","W","W"],
    ["W",".",".",".","W",".","W","W",".","W","W","W","W","W",".",".","E","E","W"],
    ["W",".","B",".",".","B",".",".",".",".",".",".",".",".",".",".","E","E","W"],
    ["W","W","W","W","W",".","W","W","W",".","W","P","W","W",".",".","E","E"," "," "],
    [" "," "," "," ","W",".",".",".",".",".","W","W","W","W","W","W","W","W","W"],
    [" "," "," "," ","W","W","W","W","W","W","W"," "," "," "," "," "," "," "," "],
  ];
  defaultArena: Array<TileType[]> = [
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "],
    [" "," "," "," "," "," "," "," "]
  ]; 
  level: Level|undefined;

  constructor() { }

  loadEmptyLevelForEditing(): Level {
    this.level = new Level(this.defaultArena);
    return this.level;
  }

  loadLevel(): Level {
    this.level = new Level(this.arena);
    return this.level;
  }

  getLevel(): Level {
    return this.level;
  }
}
