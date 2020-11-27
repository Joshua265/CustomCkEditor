import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { RevealJS, Slide, H } from 'revealjs-react';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from './reveal.svg';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

class CreateSlides extends Plugin {
  init() {
    this._defineSchema();
    const editor = this.editor;
    editor.ui.componentFactory.add('insertRevealJS', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Slide',
        icon: imageIcon,
        tooltip: true
      });

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        editor.model.change((writer) => {
          const RevealJSElement = writer.createElement('RevealJS', {});

          // Insert the RevealJS in the current selection location.
          editor.model.insertContent(
            RevealJSElement,
            editor.model.document.selection
          );
        });
      });

      return view;
    });
  }

  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register('RevealJS', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block'
    });

    schema.register('Slide', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'RevealJS',

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: '$block'
    });

    schema.register('H', {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: 'Slide',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root'
    });
  }

  _defineConverters() {
    const editor = this.editor;
    const conversion = editor.conversion;
    const renderProduct = editor.config.get('products').productRenderer;

    // <productPreview> converters ((data) view → model)
    conversion.for('upcast').elementToElement({
      view: {
        name: 'RevealJS',
        classes: 'RevealJS'
      },
      model: (viewElement, { writer: modelWriter }) => {
        // Read the "data-id" attribute from the view and set it as the "id" in the model.
        return modelWriter.createElement('RevealJS', {});
      }
    });

    // <productPreview> converters (model → data view)
    conversion.for('dataDowncast').elementToElement({
      model: 'Slide',
      view: (modelElement, { writer: viewWriter }) => {
        // In the data view, the model <productPreview> corresponds to:
        //
        // <section class="product" data-id="..."></section>
        return viewWriter.createEmptyElement('Slide', {
          class: 'Slide'
        });
      }
    });

    // <productPreview> converters (model → editing view)
    conversion.for('editingDowncast').elementToElement({
      model: 'H',
      view: (modelElement, { writer: viewWriter }) => {
        // In the editing view, the model <productPreview> corresponds to:
        //
        // <section class="product" data-id="...">
        //     <div class="product__react-wrapper">
        //         <ProductPreview /> (React component)
        //     </div>
        // </section>
        // const id = modelElement.getAttribute('id');

        // The outermost <section class="product" data-id="..."></section> element.
        const section = viewWriter.createContainerElement('H', {
          class: 'H'
          //   'data-id': id
        });

        // The inner <div class="product__react-wrapper"></div> element.
        // This element will host a React <ProductPreview /> component.
        const reactWrapper = viewWriter.createRawElement(
          'div',
          {
            class: 'product__react-wrapper'
          },
          function (domElement) {
            // This the place where React renders the actual product preview hosted
            // by a UIElement in the view. You are using a function (renderer) passed as
            // editor.config.products#productRenderer.
            renderProduct(domElement);
          }
        );

        viewWriter.insert(
          viewWriter.createPositionAt(section, 0),
          reactWrapper
        );

        return toWidget(section, viewWriter, {
          label: 'revealjs'
        });
      }
    });
  }
}

export default CreateSlides;
