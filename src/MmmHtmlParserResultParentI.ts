import { MmmHtmlParserResultI } from './MmmHtmlParserResultI';

export interface MmmHtmlParserResultParentI extends MmmHtmlParserResultI {
  children?: MmmHtmlParserResultI[];
  childrenTags?: MmmHtmlParserResultI[];
  childrenTexts?: MmmHtmlParserResultI[];
}
