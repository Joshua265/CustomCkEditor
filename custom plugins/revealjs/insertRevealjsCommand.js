import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertRevealjsCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <RevealJS>*</RevealJS> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createRevealJS(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "RevealJS"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createRevealJS(writer) {
  let pages = NaN;
  do {
    try {
      pages = parseInt(window.prompt("How many Slides?"));
      console.log(pages);
    } catch (e) {
      console.log(e);
      pages = NaN;
    }
  } while (isNaN(pages) || pages < 0);
  const RevealJS = writer.createElement("RevealJS");

  for (let i = 0; i < pages; i++) {
    let H = writer.createElement("H");
    writer.append(H, RevealJS);
    writer.appendElement("paragraph", H);
  }

  return RevealJS;
}
