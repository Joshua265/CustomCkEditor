import Command from "@ckeditor/ckeditor5-core/src/command";

export default class AddSlideCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <RevealJS>*</RevealJS> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(addSlide(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "SlideShow"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function addSlide(writer) {
  console.log(editor);
  const H = writer.createElement("H");
  // writer.appendElement(H, 'RevealJS');
  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement("paragraph", H);

  return H;
}
