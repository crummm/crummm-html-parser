import { MmmHtmlParserResultParentI } from './MmmHtmlParserResultParentI';

export interface MmmHtmlParserResultTagI extends MmmHtmlParserResultParentI {
  isCommentTag: boolean;
  isOpeningTag: boolean;
  isSelfClosingTag: boolean;
  isVoidTag: boolean;
  tagName: string;
}
