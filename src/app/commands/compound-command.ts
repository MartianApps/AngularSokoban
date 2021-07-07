import { BaseCommand } from "./base-command";
import { ICommand } from "./command";

export class CompoundCommand extends BaseCommand {
    private commandList: ICommand[] = [];

    constructor(cmd: ICommand|undefined) {
        super();
        if (cmd !== undefined) {
            this.commandList.push(cmd);
        }
    }

    public static create(): CompoundCommand;
    public static create(cmd: ICommand): CompoundCommand;
    public static create(cmd?: ICommand): CompoundCommand {
        return new CompoundCommand(cmd);
    }

    public execute(): void {
        for (var i = 0; i < this.commandList.length; i++) {
            this.commandList[i].execute();
        }
    }

    public undo(): void {
        for (var i = this.commandList.length - 1; i >= 0; i--) {
            this.commandList[i].undo();
        }
    }

    public redo(): void {
        for (var i = 0; i < this.commandList.length; i++) {
            this.commandList[i].redo();
        }
    }

    public isCompound(): boolean {
        return true;
    }

    public append(cmd: ICommand) {
        this.commandList.push(cmd);
        return this; // chainable!
    }
}