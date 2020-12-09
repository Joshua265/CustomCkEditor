"use strict";

(function (document, MexleEditor, CKEditorInspector) {
  document.addEventListener("DOMContentLoaded", () => {
    MexleEditor.create(document.querySelector("#rte"), {})
      .then((editor) => {
        CKEditorInspector.attach("editor", editor);
        document
          .getElementById("save")
          .addEventListener("click", () => console.log(editor.getData()));
      })
      .catch((error) => console.error(error));
  });
})(document, MexleEditor, CKEditorInspector);
