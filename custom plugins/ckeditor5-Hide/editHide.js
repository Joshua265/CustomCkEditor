import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import InsertHideCommand from "./insertHideCommand";

export default class EditHide extends Plugin {
  static get requires() {
    return [Widget];
  }
  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add("insertHide", new InsertHideCommand(this.editor));
  }
  _defineSchema() {
    // ADDED
    const schema = this.editor.model.schema;

    schema.register("Hide", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      allowIn: "$root",

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$text",
      isInline: true,
    });

    schema.register("HideIcon", {
      // Cannot be split or left by the caret.
      isObject: true,

      allowIn: "Hide",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });

    schema.register("HideHidden", {
      // Cannot be split or left by the caret.
      isObject: true,

      allowIn: "Hide",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    // ADDED
    const conversion = this.editor.conversion;
    const src = this.editor.config.get("hide.icon");

    // <Hide> converters
    conversion.for("upcast").elementToElement({
      model: "Hide",
      view: {
        name: "span",
        classes: "Hide",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "Hide",
      view: {
        name: "span",
        classes: "Hide",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "Hide",
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createContainerElement("span", {
          class: "Hide",
        });

        return toWidget(span, viewWriter, { label: "Hide widget" });
      },
    });

    // <HideHidden> converters
    conversion.for("upcast").elementToElement({
      model: "HideHidden",
      view: {
        name: "span",
        classes: "hide-hidden",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "HideHidden",
      view: {
        name: "span",
        classes: "hide-hidden",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "HideHidden",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const span = viewWriter.createEditableElement("span", {
          class: "hide-hidden",
        });

        return toWidgetEditable(span, viewWriter);
      },
    });

    // <HideIcon> converters
    conversion.for("upcast").elementToElement({
      model: "HideIcon",
      view: {
        name: "image",
        classes: "hide-icon",
        src: src,
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "HideIcon",
      view: {
        name: "img",
        classes: "hide-icon",
        src: src,
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "HideIcon",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const section = viewWriter.createEditableElement("img", {
          class: "hide-icon",
          src: src,
          height: "24px",
          width: "24px",
        });

        return toWidgetEditable(section, viewWriter);
      },
    });
  }
}
