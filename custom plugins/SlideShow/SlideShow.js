import EditSlideShow from "./editSlideShow";
import SlideShowUi from "./slideShowUi";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class SlideShow extends Plugin {
  static get requires() {
    return [EditSlideShow, SlideShowUi];
  }
}
