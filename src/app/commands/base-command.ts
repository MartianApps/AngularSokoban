import { ICommand } from "./command";

export class BaseCommand implements ICommand {
    public execute(): void {
        throw new Error("Method not implemented.");
    }

    public undo(): void {
        throw new Error("Method not implemented.");
    }

    public redo(): void {
        this.execute();
    }

    public isMergableWith(cmd: ICommand): boolean {
        return false;
    }

    public mergeWith(cmd: ICommand): void {}

    public canBeCompoundedWith(cmd: ICommand): boolean {
        return false;
    }

    public isCompound(): boolean {
        return false;
    }    
}