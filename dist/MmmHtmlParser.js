"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("crummm-emitter-system/dist");
var MmmHtmlParserOptions_1 = require("./MmmHtmlParserOptions");
var MmmHtmlParser = (function () {
    function MmmHtmlParser() {
        //
        // INSTANCE
        //
        this._emitter = new dist_1.CrummmEmitterSystemInstance();
    }
    Object.defineProperty(MmmHtmlParser, "instance", {
        get: function () {
            return this._instance || new MmmHtmlParser();
        },
        enumerable: true,
        configurable: true
    });
    MmmHtmlParser.prototype.onStart = function (listener) {
        this._emitter.on('start', listener);
    };
    MmmHtmlParser.prototype.start = function (markup, options) {
        this._emit('start');
        var optionsFinal = options ? Object.assign(MmmHtmlParser.options, options || {}) : MmmHtmlParser.options;
        var root;
        if (optionsFinal.trimRootWhitespace) {
            markup = markup.trim();
        }
        root = {
            content: markup,
            contentIndexStart: 0,
            contentIndexEnd: markup.length,
            id: this._generateId(),
            tagsClosedCount: 0,
            tagsErrorCount: 0,
            tagsIgnoredCount: 0,
            tagsOpenedCount: 0,
            tagsTotalCount: 0,
            type: 'Root'
        };
        if (optionsFinal.generateAdvancedObjects) {
            if (optionsFinal.generateAdvancedObjects) {
                root.children = [];
                root.childrenTags = [];
                root.childrenTexts = [];
            }
        }
        this._processTree(root, markup, optionsFinal);
        return root;
    };
    MmmHtmlParser.prototype._emit = function (name) {
        this._emitter.emit(name);
    };
    MmmHtmlParser.prototype._generateId = function () {
        return MmmHtmlParser._idCount++;
    };
    MmmHtmlParser.prototype._getTagName = function (tagContent, options) {
        // get tag name
        tagContent = tagContent.charAt(0) === '<' ? tagContent.match(options.regexPatternTagName)[1] : '';
        // strip any leading slash
        tagContent = tagContent.replace(/^\//g, '');
        return tagContent;
    };
    MmmHtmlParser.prototype._processIgnoreInnerContent = function (markup, root, tag, tagResults, i, ignoreAllTagsUntilClosingTagName, options) {
        // set worst case scenario just in case there's no closing tag
        var tagResultsLength = tagResults.length;
        var innerContentIndexStart = tag.contentIndexEnd;
        var innerContentIndexEnd = root.contentIndexEnd;
        var j = i;
        var forwardTag;
        // loop over remaining tags looking for matching ignore tag
        while (j < tagResultsLength - 1 && (forwardTag = tagResults[j + 1]).tagName !== ignoreAllTagsUntilClosingTagName) {
            j++;
        }
        if (forwardTag.tagName === ignoreAllTagsUntilClosingTagName) {
            innerContentIndexEnd = forwardTag.contentIndexStart;
        }
        return this._processRawText(markup, innerContentIndexStart, innerContentIndexEnd, tag, options);
    };
    MmmHtmlParser.prototype._processRawTags = function (markup, options) {
        var tagMatches = [];
        var tagMatch; // an individual regex search result from the results array
        var tagMatchesCount = 0;
        // loop over the regex search results
        while (tagMatch = options.regexPatternAllTags.exec(markup)) {
            tagMatches[tagMatchesCount++] = this._processRawTag(tagMatch, options);
        }
        return tagMatches;
    };
    MmmHtmlParser.prototype._processRawTag = function (tagMatch, options) {
        var tagMatchContent = tagMatch[0];
        var tagName = this._getTagName(tagMatchContent, options);
        var tag = {
            content: tagMatchContent,
            contentIndexStart: tagMatch.index,
            contentIndexEnd: tagMatch.index + tagMatchContent.length,
            id: this._generateId(),
            isCommentTag: !!tagMatchContent.match(options.regexPatternComment),
            isOpeningTag: tagMatchContent.charAt(1) !== '/',
            isSelfClosingTag: tagMatchContent.substring(tagMatchContent.length - 2, tagMatchContent.length) === '/>',
            isVoidTag: options.voidElements[tagName] === true,
            tagName: tagName,
            type: 'Tag'
        };
        if (options.generateAdvancedObjects) {
            tag.children = [];
            tag.childrenTags = [];
            tag.childrenTexts = [];
        }
        return tag;
    };
    MmmHtmlParser.prototype._processRawText = function (markup, indexStart, indexEnd, tag, options) {
        var content = markup.substring(indexStart, indexEnd);
        var text = {
            content: content,
            contentIndexStart: indexStart,
            contentIndexEnd: indexEnd,
            contentSansLineBreaks: content.replace(/(\r\n|\n|\r)/gm, ''),
            contentSansLineBreaksAndTabs: content.replace(/[\r\n\t]/g, ''),
            contentSansLineBreaksAndRedundantSpaces: content.replace(/\s\s+/g, ' '),
            contentTrimmed: content.trim(),
            contentTrimmedAndSansLineBreaksAndRedundantSpaces: content.trim().replace(/\s\s+/g, ' '),
            id: this._generateId(),
            type: 'Text'
        };
        // if valid text *OR* option is set to include invalid/whitespace-only text
        if (text.contentTrimmed.length > 0 || options.includeEmptyInnerText === true) {
            // console.log('content____________________________: ', text.content);
            // console.log('contentSansLineBreaks______________: ', text.contentSansLineBreaks);
            // console.log('contentSansLineBreaksAndTabs_______: ', text.contentSansLineBreaksAndTabs);
            // console.log('contentSansLineBreaksAndRedundantSpaces: ', text.contentSansLineBreaksAndRedundantSpaces);
            this._emit('text');
            if (options.generateAdvancedObjects === true) {
                // console.log('____addTo: ', tag['tagName'], ' &was: ', tag.children.length);
                tag.children.push(text);
                tag.childrenTexts.push(text);
            }
        }
        return text;
    };
    MmmHtmlParser.prototype._processTree = function (root, markup, options) {
        var tagResults = this._processRawTags(markup, options);
        var tagResultsLength = tagResults.length;
        var remainingOpenTags = [];
        var tag;
        var nextTag;
        var lastOpenTag;
        var text;
        var ignoreAllTags = false; // whether to skip processing tags for use with special tags and conditions like <code>
        var ignoreAllTagsUntilClosingTagName;
        var i = 0;
        var tempCount = 0;
        root.tagsTotalCount = tagResultsLength;
        console.log('tagResults: ', tagResults);
        // loop over the regex search results again
        // note: this time, we have the full list of tags and can look forward as needed
        while (i < tagResultsLength) {
            tag = tagResults[i];
            nextTag = i + 1 < tagResultsLength ? tagResults[i + 1] : undefined;
            lastOpenTag = remainingOpenTags.length > 0 ? remainingOpenTags[remainingOpenTags.length - 1] : undefined;
            // console.log(tag.isOpeningTag ? '+' : '-', ' tag: ', tag.tagName, ' &tag: ', tag.content);
            // if this is the first tag being processed *AND* there's content before it (e.g. text or whitespace if options 'trimRootWhitespace' is set to false)
            if (i === 0 && tag.contentIndexStart !== 0) {
                text = this._processRawText(markup, 0, tag.contentIndexStart, root, options);
            }
            // if open tag and ignore mode is disabled
            if (tag.isOpeningTag === true && ignoreAllTags === false) {
                this._emit('opentag');
                root.tagsOpenedCount++;
                // if advanced object generation is enabled
                if (options.generateAdvancedObjects === true) {
                    // add to last open tag (if it exist) *ELSE* add it to root
                    (lastOpenTag || root).children.push(tag);
                    (lastOpenTag || root).childrenTags.push(tag);
                }
                // if common open tag
                if (tag.isSelfClosingTag === false && tag.isVoidTag === false && tag.isCommentTag === false) {
                    // add to most recently opened tag
                    remainingOpenTags.push(tag);
                }
                // if this tag's inner contents should be ignored (don't process in any tags or text)
                if (options.ignoreInnerTagElements[tag.tagName] === true) {
                    ignoreAllTags = true;
                    ignoreAllTagsUntilClosingTagName = tag.tagName;
                    this._processIgnoreInnerContent(markup, root, tag, tagResults, i, ignoreAllTagsUntilClosingTagName, options);
                }
                else {
                    this._testForText(markup, root, tag, nextTag, lastOpenTag, options);
                }
                if (tag.isSelfClosingTag === true || tag.isVoidTag === true || tag.isCommentTag === true) {
                    this._emit('closetag');
                    root.tagsClosedCount++;
                }
            }
            else if (tag.isOpeningTag === false && (ignoreAllTags === false || tag.tagName === ignoreAllTagsUntilClosingTagName)) {
                // if there's no last open tag
                if (!lastOpenTag) {
                    console.warn('******* error 1: unexpected close tag when there are no open tags: ', tag.tagName);
                    root.tagsErrorCount++;
                }
                else if (tag.tagName !== lastOpenTag.tagName) {
                    // if -- what should be a void element -- is incorrectly terminated by an illegal closing tag (damnit)
                    if (tag.isVoidTag === true && options.voidElements[tag.tagName]) {
                        // TODO - output errors so anything using this can display
                    }
                    else {
                        console.warn('******* error 2: unexpected close tag name not matching open tag: ', tag.tagName, ' &id: ', tag.id, ' &lastOpenTag.tagName: ', lastOpenTag.tagName, ' &tag.content-pre: ', markup.substring(tag.contentIndexStart - 20, tag.contentIndexStart));
                        root.tagsErrorCount++;
                    }
                }
                else {
                    this._emit('closetag');
                    root.tagsClosedCount++;
                    // TODO - include close tag indexes?
                    remainingOpenTags.pop();
                    // if ignore all tags mode is on (true) and this ignore closing tag has been found
                    if (ignoreAllTags === true && options.ignoreInnerTagElements[tag.tagName] === true && tag.tagName === ignoreAllTagsUntilClosingTagName) {
                        ignoreAllTags = false;
                        ignoreAllTagsUntilClosingTagName = undefined;
                    }
                    // with the tag now closed, last open tag needs to be re-established
                    lastOpenTag = remainingOpenTags.length > 0 ? remainingOpenTags[remainingOpenTags.length - 1] : undefined;
                    if (lastOpenTag) {
                        this._testForText(markup, root, tag, nextTag, lastOpenTag, options);
                    }
                }
            }
            else {
                root.tagsIgnoredCount++;
            }
            i++;
        }
        return root;
    };
    MmmHtmlParser.prototype._testForText = function (markup, root, tag, nextTag, lastOpenTag, options) {
        if (nextTag && tag.contentIndexEnd !== nextTag.contentIndexStart) {
            var addToTag = tag.isOpeningTag === true && tag.isSelfClosingTag === false && tag.isVoidTag === false && tag.isCommentTag === false ? tag : lastOpenTag;
            this._processRawText(markup, tag.contentIndexEnd, nextTag.contentIndexStart, addToTag, options);
        }
        else if (!nextTag && tag.contentIndexEnd !== root.contentIndexEnd) {
            this._processRawText(markup, tag.contentIndexEnd, root.contentIndexEnd, tag, options);
        }
    };
    MmmHtmlParser.options = new MmmHtmlParserOptions_1.MmmHtmlParserOptions();
    MmmHtmlParser._idCount = 0;
    return MmmHtmlParser;
}());
exports.MmmHtmlParser = MmmHtmlParser;
