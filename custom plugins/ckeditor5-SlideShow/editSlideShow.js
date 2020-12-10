import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import InsertSlideShowCommand from "./insertSlideShowCommand";
import AddSlideCommand from "./addSlideCommand";

export default class EditSlideShow extends Plugin {
  static get requires() {
    return [Widget];
  }
  init() {
    console.log("EditSlideShow#init() got called");

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "insertSlideShow",
      new InsertSlideShowCommand(this.editor)
    );

    this.editor.commands.add("addSlide", new AddSlideCommand(this.editor));
  }
  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register("SlideShow", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      allowIn: "$root",

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$block",
    });

    schema.register("Slide", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "SlideShow",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;

    // <RevealJS> converters
    conversion.for("upcast").elementToElement({
      model: "SlideShow",
      view: {
        name: "div",
        classes: "slideshow",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "SlideShow",
      view: {
        name: "div",
        classes: "slideshow",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "SlideShow",
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement("div", {
          class: "slideshow",
        });

        return toWidget(div, viewWriter, { label: "SlideShow widget" });
      },
    });

    // <H> converters
    conversion.for("upcast").elementToElement({
      model: "Slide",
      view: {
        name: "section",
        classes: "slide",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "Slide",
      view: {
        name: "section",
        classes: "slide",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "Slide",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const section = viewWriter.createEditableElement("section", {
          class: "slide",
        });

        return toWidgetEditable(section, viewWriter);
      },
    });
  }
}
