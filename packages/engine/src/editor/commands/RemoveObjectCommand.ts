import Command from "./Command";
import { serializeObject3D } from "../functions/debug";
export default class RemoveObjectCommand extends Command {
  object: any;
  parent: any;
  before: any;
  oldSelection: any;
  constructor(editor, object) {
    super(editor);
    this.object = object;
    this.parent = object.parent;
    if (this.parent) {
      const index = this.parent.children.indexOf(this.object);
      if (this.parent.children.length > index + 1) {
        this.before = this.parent.children[index + 1];
      }
    }
    this.oldSelection = editor.selected.slice(0);
  }
  execute() {
    this.editor.removeObject(this.object, false);
  }
  undo() {
    this.editor.addObject(
      this.object,
      this.parent,
      this.before,
      false,
      true,
      false
    );
    this.editor.setSelection(this.oldSelection, false);
  }
  toString() {
    return `${this.constructor.name} id: ${this.id} object: ${serializeObject3D(
      this.object
    )}`;
  }
}
