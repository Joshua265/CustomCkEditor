import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertSlideShowCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <RevealJS>*</RevealJS> at the current selection position
      // in a way that will result in creating a valid model structure.

      let pages = NaN;
      do {
        try {
          pages = window.prompt("How many Slides?");

          if (pages == null) {
            return;
          }
          pages = parseInt(pages);
        } catch (e) {
          pages = NaN;
        }
      } while (isNaN(pages) || pages < 0);
      const RevealJS = writer.createElement("SlideShow");

      for (let i = 0; i < pages; i++) {
        let Slide = writer.createElement("Slide");
        writer.append(Slide, RevealJS);
        writer.appendElement("paragraph", Slide);
      }

      this.editor.model.insertContent(RevealJS);
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
