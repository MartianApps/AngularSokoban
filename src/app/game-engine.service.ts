import { Injectable } from '@angular/core';
import { CommandProcessorService } from './command-processor.service';
import { ChangeTileTypeCommand } from './commands/change-tile-type-command';
import { CompoundCommand } from './commands/compound-command';
import { Facing, Level } from './level';
import { TileType2 } from './tiles';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  public level: Level|undefined;

  constructor(public commandProcessorService: CommandProcessorService) { }

  setLevel(level: Level): void {
    this.level = level;
  }

  getStepCount(): number {
    return this.commandProcessorService.undoCommandCount();
  }

  canMoveInDirection(facing: Facing): boolean {
    let playerTile = this.level.getPlayerTile();

    if (playerTile.isNextToWall(facing)) 
      return false;

    if (playerTile.isNextToDoubleBoxes(facing)) 
      return false;

    if (playerTile.isNextToBoxInfrontOfWall(facing)) 
      return false;
      
    return true;
  }

  moveInDirection(facing: Facing): boolean {
    if (!this.canMoveInDirection(facing))
      return false;

    const playerTile = this.level.getPlayerTile();
    const firstTile = playerTile[facing];
    const secondTile = firstTile[facing];
    const formerPlayerTileNewType = playerTile.isExit ? TileType2.Exit : TileType2.Floor;

    this.commandProcessorService.execute(CompoundCommand.create()
      .append(ChangeTileTypeCommand.create(playerTile, formerPlayerTileNewType))
      .append(ChangeTileTypeCommand.create(firstTile, TileType2.Player))
      .appendIf(ChangeTileTypeCommand.create(secondTile, TileType2.Box), firstTile.isBox())
    );
    return true;
  }
}
