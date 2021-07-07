import { Injectable } from '@angular/core';
import { ICommand } from './commands/command';
import { CompoundCommand } from './commands/compound-command';

@Injectable({
  providedIn: 'root'
})
export class CommandProcessorService {
  undoStack: ICommand[] = [];
  redoStack: ICommand[] = [];
  breakNextCompoundFlag:boolean = false;
  breakNextMergeFlag:boolean = false;

  constructor() { }

  undoCommandCount(): number {
    return this.undoStack.length;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  // use carefully!!
  public eraseLastUndoCmd(): void {
    this.undoStack.pop();
  }

  // use carefully!!
  public emptyStacks(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.breakNextCompoundFlag = false;
    this.breakNextMergeFlag = false;
  }

  public breakNextCompound(): void {
    this.breakNextCompoundFlag = true;
  }

  public breakNextMerge(): void {
    this.breakNextMergeFlag = true;
  }

  public execute(command: ICommand) {
    this.redoStack = [];
    command.execute();

    // check if it is mergable with previous command
    // create compound if YES and in case it is not already a compount command
    if (this.undoStack.length > 0) {
        var lastCommand = this.undoStack.pop();
        // check das letzte Command ob es mit dem neuen Command gruppiert werden will
        if (lastCommand.canBeCompoundedWith(command) && !this.breakNextCompoundFlag) {
            // Gruppierung !!!!
            // Ist das letzte bereits ein Compound?
            if (!lastCommand.isCompound()) {
                // Noch nicht ... erstmal in eines umwandeln
                lastCommand = CompoundCommand.create(lastCommand);
            }
            // Jetzt haben wir im letzten Command definitiv ein Compound ... das aktuelle Command nur noch adden
            (lastCommand as CompoundCommand).append(command);
            this.undoStack.push(lastCommand);

        } else if (lastCommand.isMergableWith(command) && !this.breakNextMergeFlag) {
            lastCommand.mergeWith(command);
            this.undoStack.push(lastCommand);
        } else {
            // Nein, keine Gruppierung und kein Merge ...
            // letztes Command wieder in Liste und das aktuelle oben drauf
            this.undoStack.push(lastCommand);
            this.undoStack.push(command);
        }
    } else {
        this.undoStack.push(command);
    }
    this.breakNextCompoundFlag = false;
    this.breakNextMergeFlag = false;
  }

  public undo(): void {
    if (this.undoStack.length <= 0) {
        return;
    }

    var cmd = this.undoStack.pop();
    cmd.undo();
    this.redoStack.push(cmd);
  }

  public redo(): void {
    if (this.redoStack.length <= 0) {
        return;
    }
    var cmd = this.redoStack.pop();
    cmd.redo();
    this.undoStack.push(cmd);
  }
}
