import { MmmHtmlParserResultI } from './MmmHtmlParserResultI';

export interface MmmHtmlParserResultTextI extends MmmHtmlParserResultI {
  contentSansLineBreaks: string;
  contentSansLineBreaksAndTabs: string;
  contentSansLineBreaksAndRedundantSpaces: string;
  contentTrimmed: string;
  contentTrimmedAndSansLineBreaksAndRedundantSpaces: string;
}
