import EditHide from "./editHide";
import HideUi from "./HideUi";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class Hide extends Plugin {
  static get requires() {
    return [EditHide, HideUi];
  }
}
