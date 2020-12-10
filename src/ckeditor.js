/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment.js";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import Autolink from "@ckeditor/ckeditor5-link/src/autolink.js";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily.js";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight.js";
import HtmlEmbed from "@ckeditor/ckeditor5-html-embed/src/htmlembed.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert.js";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import ListStyle from "@ckeditor/ckeditor5-list/src/liststyle.js";
import MathType from "@wiris/mathtype-ckeditor5";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters.js";
import SpecialCharactersArrows from "@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js";
import SpecialCharactersCurrency from "@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js";
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js";
import SpecialCharactersLatin from "@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js";
import SpecialCharactersMathematical from "@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js";
import SpecialCharactersText from "@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough.js";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";

import SlideShow from "../custom plugins/ckeditor5-SlideShow/SlideShow";
import Anchor from "../custom plugins/ckeditor5-anchor/src/anchor";
import Media from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import MediaCaption from "../custom plugins/ckeditor5-media/src/mediacaption";
import MediaStyle from "../custom plugins/ckeditor5-media/src/mediastyle";
import MediaToolbar from "../custom plugins/ckeditor5-media/src/mediatoolbar";
import MediaTextAlternative from "../custom plugins/ckeditor5-media/src/mediatextalternative";
import Hide from "../custom plugins/ckeditor5-Hide/Hide";

import * as sanitize from "sanitize-html";

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Anchor,
  Alignment,
  Autoformat,
  Autolink,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Hide,
  Highlight,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListStyle,
  MathType,
  Media,
  MediaCaption,
  MediaStyle,
  MediaToolbar,
  MediaTextAlternative,
  Paragraph,
  PasteFromOffice,
  SlideShow,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
];

Editor.defaultConfig = {
  toolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "anchor",
    "|",
    "highlight",
    "fontColor",
    "fontFamily",
    "fontSize",
    "|",
    "numberedList",
    "bulletedList",
    "|",
    "CodeBlock",
    "htmlEmbed",
    "slideshow",
    "imageInsert",
    "mediaEmbed",
    "|",
    "indent",
    "outdent",
    "|",
    "MathType",
    "ChemType",
    "SpecialCharacters",
    "insertTable",
    "hide",
  ],
  link: {
    decorators: {
      openInNewTab: {
        mode: "manual",
        label: "Open in a new tab",
        defaultValue: true, // This option will be selected by default.
        attributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
    },
  },
  image: {
    upload: {
      types: ["jpeg", "png", "gif", "bmp", "webp", "tiff", "svg+xml"],
    },
    toolbar: [
      "imageStyle:full",
      "imageStyle:side",
      "|",
      "imageTextAlternative",
    ],
  },
  hide: {
    icon: "../custom plugins/ckeditor5-Hide/theme/icons/Hide.svg",
  },
  htmlEmbed: {
    showPreviews: true,
    sanitizeHtml: (inputHtml) => {
      // Strip unsafe elements and attributes, e.g.:
      // the `<script>` elements and `on*` attributes.
      const outputHtml = sanitize(inputHtml);

      return {
        html: outputHtml,
        // true or false depending on whether the sanitizer stripped anything.
        hasChanged: true,
      };
    },
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
  },
  media: {
    browser: "../mediaBrowser/mediaBrowser.html",
  },
};

export default Editor;
