import { CrummmEmitterSystemInstance } from 'crummm-emitter-system/dist';
import { MmmHtmlParserOptions } from './MmmHtmlParserOptions';
import { MmmHtmlParserResultRootI } from './MmmHtmlParserResultRootI';
import { MmmHtmlParserResultTagI } from './MmmHtmlParserResultTagI';
import { MmmHtmlParserResultTextI } from './MmmHtmlParserResultTextI';
import { MmmHtmlParserResultParentI } from './MmmHtmlParserResultParentI';
export declare class MmmHtmlParser {
    protected static _instance: MmmHtmlParser;
    static readonly instance: MmmHtmlParser;
    static options: MmmHtmlParserOptions;
    protected static _idCount: number;
    protected _emitter: CrummmEmitterSystemInstance;
    constructor();
    onStart(listener: () => {}): void;
    start(markup: string, options?: MmmHtmlParserOptions): MmmHtmlParserResultRootI;
    protected _emit(name: string): void;
    protected _generateId(): number;
    protected _getTagName(tagContent: string, options: MmmHtmlParserOptions): string;
    protected _processIgnoreInnerContent(markup: string, root: MmmHtmlParserResultRootI, tag: MmmHtmlParserResultTagI, tagResults: MmmHtmlParserResultTagI[], i: number, ignoreAllTagsUntilClosingTagName: string, options: MmmHtmlParserOptions): MmmHtmlParserResultTextI;
    protected _processRawTags(markup: string, options: MmmHtmlParserOptions): MmmHtmlParserResultTagI[];
    protected _processRawTag(tagMatch: RegExpExecArray, options: MmmHtmlParserOptions): MmmHtmlParserResultTagI;
    protected _processRawText(markup: string, indexStart: number, indexEnd: number, tag: MmmHtmlParserResultParentI, options: MmmHtmlParserOptions): MmmHtmlParserResultTextI;
    protected _processTree(root: MmmHtmlParserResultRootI, markup: string, options?: MmmHtmlParserOptions): MmmHtmlParserResultRootI;
    protected _testForText(markup: string, root: MmmHtmlParserResultRootI, tag: MmmHtmlParserResultTagI, nextTag: MmmHtmlParserResultTagI, lastOpenTag: MmmHtmlParserResultTagI, options: MmmHtmlParserOptions): void;
}
