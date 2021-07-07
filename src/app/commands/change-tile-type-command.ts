import { ITile, TileType } from "../tiles";
import { BaseCommand } from "./base-command";
import { ICommand } from "./command";

export class ChangeTileTypeCommand extends BaseCommand {
    newType: TileType;
    oldType: TileType|undefined;
    tile: ITile;

    public static create(tile: ITile, newType: TileType): ICommand {
        var cmd = new ChangeTileTypeCommand();
        cmd.tile = tile;
        cmd.newType = newType;
        return cmd;
    }

    public execute(): void {
        this.oldType = this.tile.type;
        this.tile.type = this.newType;
    }

    public undo(): void {
        this.tile.type = this.oldType;
    }
}