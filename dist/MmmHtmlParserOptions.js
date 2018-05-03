"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MmmHtmlParserOptions = (function () {
    function MmmHtmlParserOptions() {
        this.generateAdvancedObjects = true; // whether to create advanced object with features like children allowing for full node tree
        this.regexPatternAllTags = /<.*?[\s\S]*?>/g; // regex for opening and self-closing tags (while accounting for line tags spanning multiple lines)
        this.regexPatternComment = /<![\s\S]*?>/g; // regex for html comment
        this.regexPatternTagName = /<([^\s>]+)(\s|)+/; // regex tag element name
        this.trimRootWhitespace = true; // whether to trim left and right space from initial markup being parsed
        this.includeEmptyInnerText = false; // whether to include empty text (all whitespace) in advanced objects and firing events
        this.voidElements = {
            area: true,
            base: true,
            basefont: true,
            br: true,
            col: true,
            command: true,
            embed: true,
            frame: true,
            hr: true,
            img: true,
            input: true,
            isindex: true,
            keygen: true,
            link: true,
            meta: true,
            param: true,
            source: true,
            track: true,
            wbr: true
        };
        this.ignoreInnerTagElements = {
            script: true,
            code: true
        };
    }
    return MmmHtmlParserOptions;
}());
exports.MmmHtmlParserOptions = MmmHtmlParserOptions;
