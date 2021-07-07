export enum TileType {
    Space = " ",
    Wall = "W",
    Floor = ".",
    Player = "P",
    Box = "B",
    Exit = "E",
    FinishedBox = "F"
}

export interface ITile {
    type: TileType;
    isExit:boolean;
    top: ITile|undefined;
    right: ITile|undefined;
    bottom: ITile|undefined;
    left: ITile|undefined;
}

export class Tile implements ITile {
    type: TileType;
    isExit:boolean;
    top: ITile|undefined;
    right: ITile|undefined;
    bottom: ITile|undefined;
    left: ITile|undefined;

    constructor(type: TileType, isExit: boolean) {
        this.type = type;
        this.isExit = isExit;
    }
}