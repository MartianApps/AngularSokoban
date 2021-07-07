import { Facing } from "./level";

export enum TileType2 {
    Space = " ",
    Wall = "W",
    Floor = ".",
    Player = "P",
    Box = "B",
    Exit = "E"
}

export type TileType = " " | "W" | "." | "P" | "B" | "E" | TileType2;

export interface ITile {
    type: TileType;
    isExit:boolean;
    top?: ITile;
    right?: ITile;
    bottom?: ITile;
    left?: ITile;

    isBox(): boolean;
    isNextToWall(facing: Facing): boolean;
    isNextToDoubleBoxes(facing: Facing): boolean;
    isNextToBoxInfrontOfWall(facing: Facing): boolean;
}

export class Tile implements ITile {
    constructor(public type: TileType, public isExit: boolean) {
    }

    isBox(): boolean {
        return this.type === TileType2.Box;
    }

    isWall(): boolean {
        return this.type === TileType2.Wall;
    }

    isNextToWall(facing: Facing): boolean {
        if (!this[facing]) 
            return false;

        return this[facing].isWall();
    }

    isNextToDoubleBoxes(facing: Facing): boolean {
        if (!this[facing]) 
            return false;

        if (!this[facing][facing]) 
            return false;

        return this[facing].isBox() && this[facing][facing].isBox();
    }

    isNextToBoxInfrontOfWall(facing: Facing): boolean {
        if (!this[facing]) 
            return false;

        if (!this[facing][facing]) 
            return false;

        return this[facing].isBox() && this[facing][facing].isWall();
    }
}