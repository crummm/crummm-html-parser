export declare class MmmHtmlParserOptions {
    generateAdvancedObjects: boolean;
    regexPatternAllTags: RegExp;
    regexPatternComment: RegExp;
    regexPatternTagName: RegExp;
    trimRootWhitespace: boolean;
    includeEmptyInnerText: boolean;
    voidElements: {
        [element: string]: boolean;
    };
    ignoreInnerTagElements: {
        [tagName: string]: boolean;
    };
}
