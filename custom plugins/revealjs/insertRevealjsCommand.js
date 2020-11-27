import Command from '@ckeditor/ckeditor5-core/src/command';

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
      'RevealJS'
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createRevealJS(writer) {
  const RevealJS = writer.createElement('RevealJS');
  const H = writer.createElement('H');

  writer.append(H, RevealJS);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement('paragraph', H);

  writer.createPositionAfter(H);

  return RevealJS;
}
