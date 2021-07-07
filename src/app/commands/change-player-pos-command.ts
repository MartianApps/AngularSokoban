import { Point } from "../structures";
import { BaseCommand } from "./base-command";
import { ICommand } from "./command";

export class ChangePlayerPosCommand extends BaseCommand {
    playerPos: Point;
    axisToChange: string;
    direction: number;

    public static create(playerPos: Point, axisToChange: string, direction: number): ICommand {
        if (direction !== 1 && direction !== -1) 
            throw new Error("direction must be 1 or -1.");
        if (axisToChange !== "x" && axisToChange !== "y")
            throw new Error("axisToChange must be x or y.");

        var cmd = new ChangePlayerPosCommand();
        cmd.playerPos = playerPos;
        cmd.axisToChange = axisToChange;
        cmd.direction = direction;
        return cmd;
    }

    public execute(): void {
        this.playerPos[this.axisToChange] = this.playerPos[this.axisToChange] + this.direction;
    }

    public undo(): void {
        this.playerPos[this.axisToChange] = this.playerPos[this.axisToChange] + (this.direction * -1);
    }
}