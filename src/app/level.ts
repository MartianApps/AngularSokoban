import { ITile, TileType, Tile } from "./tiles";
import { Point } from './structures';
import { CommandProcessorService } from "./command-processor.service";
import { CompoundCommand } from "./commands/compound-command";
import { ChangeTileTypeCommand } from "./commands/change-tile-type-command";
import { ChangePlayerPosCommand } from "./commands/change-player-pos-command";

export enum Facing {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right"
}

export class Level {
    public tiles: ITile[][] = [];
    private playerPos: Point = { x: -1, y: -1};

    constructor(private commandProcessorService: CommandProcessorService, arena: string[][]) {
        // Tiles initial erstellen
        for (var i: number = 0; i < arena.length; i++) {
            this.tiles.push([]);
            for (var j: number = 0; j < arena[i].length; j++) {
              let enumValue: TileType = arena[i][j] as TileType;
              this.tiles[i].push(new Tile(enumValue, enumValue === TileType.Exit));
      
              if (enumValue === TileType.Player) {
                this.playerPos = {
                  x: j,
                  y: i
                }
              }
            }
        }

        //  verlinken der tiles
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

    getCurrentTile(): ITile {
        return this.tiles[this.playerPos.y][this.playerPos.x];
    }

    getStepCount(): number {
        return this.commandProcessorService.undoCommandCount();
    }

    canMoveInDirection(facing: Facing): boolean {
        if (this.getCurrentTile()[facing] === undefined) {
            return false;
        } else {
            let firstTileInDirection: ITile = this.getCurrentTile()[facing];
            let secondTileInDirection: ITile = this.getCurrentTile()[facing][facing];
            if (firstTileInDirection.type === TileType.Wall) {
                return false;
            } else {                
                if (secondTileInDirection == undefined) {
                    return false;
                } else if ((firstTileInDirection.type == TileType.Box || firstTileInDirection.type == TileType.FinishedBox) &&
                           (secondTileInDirection.type == TileType.Box || secondTileInDirection.type == TileType.Wall)){
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    calcSign(facing: Facing): number {
        switch (facing) {
            case Facing.bottom: return 1;
            case Facing.top: return -1;
            case Facing.right: return 1;
            case Facing.left: return -1;
            default: return 1;
        }
    }

    calcAxis(facing: Facing): string {
        switch (facing) {
            case Facing.bottom: return "y";
            case Facing.top: return "y";
            case Facing.right: return "x";
            case Facing.left: return "x";
            default:  return "x";
        }
    }

    moveInDirection(facing: Facing): boolean {
        if (this.canMoveInDirection(facing)) {
            let compoundCommand = CompoundCommand.create();

            let currentTile = this.getCurrentTile();
            let firstTile = currentTile[facing];
            if (firstTile.type == TileType.Box || firstTile.type == TileType.FinishedBox) {
                let secondTile = firstTile[facing];
                if (secondTile.type == TileType.Exit) {
                    compoundCommand.append(ChangeTileTypeCommand.create(secondTile, TileType.FinishedBox));
                } else {
                    compoundCommand.append(ChangeTileTypeCommand.create(secondTile, TileType.Box));
                }                
            }
            compoundCommand.append(ChangeTileTypeCommand.create(firstTile, TileType.Player));
            console.log(currentTile);
            if (currentTile.isExit) {
                compoundCommand.append(ChangeTileTypeCommand.create(currentTile, TileType.Exit));
            } else {
                compoundCommand.append(ChangeTileTypeCommand.create(currentTile, TileType.Floor));
            }            
            let axisToChange = this.calcAxis(facing);
            let direction = this.calcSign(facing);
            compoundCommand.append(ChangePlayerPosCommand.create(this.playerPos, axisToChange, direction));

            this.commandProcessorService.execute(compoundCommand);
            return true;
        } else {
            return false;
        }
    }    
}