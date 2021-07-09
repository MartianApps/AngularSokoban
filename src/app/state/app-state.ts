import { ICommand } from "../commands/command";
import { ITile } from "../tiles";

export interface CommandProcessorState {
    undoStack: ICommand[];
    redoStack: ICommand[];
    breakNextCompoundFlag:boolean;
    breakNextMergeFlag:boolean;
}

export interface LevelState {
    tiles: Array<ITile[]>;
    commands: CommandProcessorState;
}

export interface AppState {
    activeLevel: LevelState;
}