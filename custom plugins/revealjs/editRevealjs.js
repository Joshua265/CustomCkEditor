import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {
  toWidget,
  toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertRevealjsCommand from './insertRevealjsCommand';
import AddSlideCommand from './addSlideCommand';

export default class EditRevealjs extends Plugin {
  static get requires() {
    return [Widget];
  }
  init() {
    console.log('EditRevealjs#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertRevealjs',
      new InsertRevealjsCommand(this.editor)
    );

    this.editor.commands.add('addSlide', new AddSlideCommand(this.editor));
  }
  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register('RevealJS', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      allowIn: '$root',

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block'
    });

    schema.register('H', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'RevealJS',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root'
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    // <RevealJS> converters
    conversion.for('upcast').elementToElement({
      model: 'RevealJS',
      view: {
        name: 'div',
        classes: 'reveal'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'RevealJS',
      view: {
        name: 'div',
        classes: 'reveal'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'RevealJS',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'reveal'
        });

        return toWidget(div, viewWriter, { label: 'RevealJS widget' });
      }
    });

    // <H> converters
    conversion.for('upcast').elementToElement({
      model: 'H',
      view: {
        name: 'section',
        classes: 'slide'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'H',
      view: {
        name: 'section',
        classes: 'slide'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'H',
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const section = viewWriter.createEditableElement('section', {
          class: 'slide'
        });

        return toWidgetEditable(section, viewWriter);
      }
    });
  }
}
