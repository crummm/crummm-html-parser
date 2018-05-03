import { MmmHtmlParserResultTypes } from './MmmHtmlParserResultTypes';
export interface MmmHtmlParserResultI {
    content: string;
    contentIndexStart: number;
    contentIndexEnd: number;
    id: number | string;
    type: MmmHtmlParserResultTypes;
}
