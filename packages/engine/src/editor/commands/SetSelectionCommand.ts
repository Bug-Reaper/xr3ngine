import Command from "./Command";
import { serializeObject3DArray } from "../functions/debug";
export default class SetSelectionCommand extends Command {
  oldSelection: any;
  objects: any;
  constructor(editor, objects) {
    super(editor);
    this.oldSelection = editor.selected.slice(0);
    this.objects = objects.slice(0);
  }
  execute() {
    this.editor.setSelection(this.objects, false);
  }
  undo() {
    this.editor.setSelection(this.oldSelection, false);
  }
  toString() {
    return `SetSelectionCommand id: ${
      this.id
    } objects: ${serializeObject3DArray(this.objects)}`;
  }
}
