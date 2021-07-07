export interface ICommand {
    execute(): void;
    undo(): void;
    redo(): void;
    isMergableWith(cmd: ICommand): boolean;
    mergeWith(cmd: ICommand): void;
    canBeCompoundedWith(cmd: ICommand): boolean;
    isCompound(): boolean;
}