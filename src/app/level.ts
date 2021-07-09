import { ITile, TileType, Tile, TileType2 } from "./tiles";
import { Point } from "./structures";

export enum Facing {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

export class Level {
  public tiles: ITile[][] = [];

  constructor(
      arena: Array<TileType[]>
  ) {
    this.createLevelStructure(arena);
  }

  createLevelStructure(arena: Array<TileType[]>): void {
    this.createTileObjectStructure(arena);
    this.linkTiles();
  }

  createTileObjectStructure(arena: Array<TileType[]>): void {
    for (var i: number = 0; i < arena.length; i++) {
      this.tiles.push([]);
      for (var j: number = 0; j < arena[i].length; j++) {
        let enumValue = arena[i][j] as TileType;
        this.tiles[i].push(new Tile(enumValue, enumValue === TileType2.Exit));
      }
    }
  }

  linkTiles(): void {
    for (var i: number = 0; i < this.tiles.length; i++) {
      for (var j: number = 0; j < this.tiles[i].length; j++) {
        if (i > 0) {
          this.tiles[i][j].top = this.tiles[i - 1][j];
        }
        if (j > 0) {
          this.tiles[i][j].left = this.tiles[i][j - 1];
        }
        if (i < this.tiles.length - 1) {
          this.tiles[i][j].bottom = this.tiles[i + 1][j];
        }
        if (j < this.tiles[i].length - 1) {
          this.tiles[i][j].right = this.tiles[i][j + 1];
        }
      }
    }
  }

  getPlayerPosition(): Point {
    for (var y: number = 0; y < this.tiles.length; y++) {
      for (var x: number = 0; x < this.tiles[y].length; x++) {
        if (this.tiles[y][x].type === TileType2.Player) {
          return {
            x: x,
            y: y,
          };
        }
      }
    }
    throw new Error("undefined player position");
  }

  getPlayerTile(): ITile {
    let pos = this.getPlayerPosition();
    return this.tiles[pos.y][pos.x];
  }
}
