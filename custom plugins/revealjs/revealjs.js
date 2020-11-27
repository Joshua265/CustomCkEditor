import EditRevealjs from './editRevealjs';
import RevealjsUi from './revealjsUi';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Revealjs extends Plugin {
  static get requires() {
    return [EditRevealjs, RevealjsUi];
  }
}
