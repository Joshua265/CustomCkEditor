import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertHideCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <Hide>*</Hide> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createHide(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "Hide"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createHide(writer) {
  const Hide = writer.createElement("Hide");
  const HideHidden = writer.createElement("HideHidden");
  const HideIcon = writer.createElement("HideIcon");

  writer.append(HideIcon, Hide);
  writer.append(HideHidden, Hide);
  writer.appendElement("paragraph", HideHidden);
  return Hide;
}
