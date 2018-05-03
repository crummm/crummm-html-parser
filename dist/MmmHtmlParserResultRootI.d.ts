import { MmmHtmlParserResultParentI } from './MmmHtmlParserResultParentI';
export interface MmmHtmlParserResultRootI extends MmmHtmlParserResultParentI {
    tagsClosedCount: number;
    tagsErrorCount: number;
    tagsIgnoredCount: number;
    tagsOpenedCount: number;
    tagsTotalCount: number;
}
