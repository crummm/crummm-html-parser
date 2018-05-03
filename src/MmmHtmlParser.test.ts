import { MmmHtmlParser } from './MmmHtmlParser';
import { MmmHtmlParserResultTagI } from './MmmHtmlParserResultTagI';
import { MmmHtmlParserResultTextI } from './MmmHtmlParserResultTextI';

// <method>_Should<expected>_When<condition>

describe(
  'Parser Options',
  () => {
    const iterations_trimRootWhitespace = [
      {trimRootWhitespace: true, expected: 0}, // test the positive
      {trimRootWhitespace: false, expected: 15} // test the negative
    ];

    iterations_trimRootWhitespace.forEach((iteration) => {
      test(`*WHEN* trimRootWhitespace is '${iteration.trimRootWhitespace}' *THEN* first tag index should match expected`, () => {
        MmmHtmlParser.options.trimRootWhitespace = iteration.trimRootWhitespace;
        const parser: MmmHtmlParser = new MmmHtmlParser();

        expect(parser.start(
          `
              <div>
                  </div>  
                  
          `
        ).childrenTags[0].contentIndexStart).toBe(iteration.expected);
      });
    })
  }
);

describe(
  'Parse Text',
  () => {
    const markdown =
      `
        <div>
          First
          name:
          <input type="text" name="firstname" value="Mickey">
          More		Text
          		Again
        </div>
      `
    ;
    const parser: MmmHtmlParser = new MmmHtmlParser();
    const div0: MmmHtmlParserResultTagI = parser.start(markdown).children[0] as MmmHtmlParserResultTagI;
    const text0: MmmHtmlParserResultTextI = div0.children[0] as MmmHtmlParserResultTextI;
    const text2: MmmHtmlParserResultTextI = div0.children[2] as MmmHtmlParserResultTextI;
    const iterations = [
      {when: 'text 0 has line breaks', then: 'content should maintain that whitespace', target: text0.content, matcher: 'toBe', expected: '\n          First\n          name:\n          '},
      {when: 'text 0 has line breaks', then: 'contentSansLineBreaks should remove line breaks', target: text0.contentSansLineBreaks, matcher: 'toBe', expected: '          First          name:          '},
      {when: 'text 0 has line breaks', then: 'contentSansLineBreaksAndTabs should remove line breaks and tabs', target: text0.contentSansLineBreaksAndTabs, matcher: 'toBe', expected: '          First          name:          '},
      {when: 'text 0 has line breaks', then: 'contentSansLineBreaksAndExtraSpaces should remove line breaks and redundant spaces', target: text0.contentSansLineBreaksAndRedundantSpaces, matcher: 'toBe', expected: ' First name: '},
      {when: 'text 0 has line breaks', then: 'contentTrimmed should trim but maintain line breaks', target: text0.contentTrimmed, matcher: 'toBe', expected: 'First\n          name:'},
      {when: 'text 0 has line breaks', then: 'contentTrimmedAndSansLineBreaksAndExtraSpaces should trim and remove line breaks and redundant spaces', target: text0.contentTrimmedAndSansLineBreaksAndRedundantSpaces, matcher: 'toBe', expected: 'First name:'},
      {when: 'text 2 has line breaks', then: 'content should maintain that whitespace', target: text2.content, matcher: 'toBe', expected: '\n          More\t\tText\n          \t\tAgain\n        '},
      {when: 'text 2 has line breaks', then: 'contentSansLineBreaks should remove line breaks', target: text2.contentSansLineBreaks, matcher: 'toBe', expected: '          More\t\tText          \t\tAgain        '},
      {when: 'text 2 has line breaks', then: 'contentSansLineBreaksAndTabs should remove line breaks and tabs', target: text2.contentSansLineBreaksAndTabs, matcher: 'toBe', expected: '          MoreText          Again        '},
      {when: 'text 2 has line breaks', then: 'contentSansLineBreaksAndExtraSpaces should remove line breaks and redundant spaces', target: text2.contentSansLineBreaksAndRedundantSpaces, matcher: 'toBe', expected: ' More Text Again '},
      {when: 'text 2 has line breaks', then: 'contentTrimmed should trim but maintain line breaks', target: text2.contentTrimmed, matcher: 'toBe', expected: 'More\t\tText\n          \t\tAgain'},
      {when: 'text 2 has line breaks', then: 'contentTrimmedAndSansLineBreaksAndExtraSpaces should trim and remove line breaks and redundant spaces', target: text2.contentTrimmedAndSansLineBreaksAndRedundantSpaces, matcher: 'toBe', expected: 'More Text Again'},
    ];

    iterations.forEach((iteration) => {
      test(`*WHEN* ${iteration.when} *THEN* ${iteration.then}`, () => {
        expect(iteration.target)[iteration.matcher](iteration.expected);
      });
    });
  }
);
