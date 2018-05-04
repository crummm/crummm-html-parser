# mmm-html-parser

A ^riDiCuLoUsLy^ forgiving Html Parser prepared for ^deLiCiOuS^ consumption within ^your^ JavaScript / TypeScript project.

## Installation

```bash
$ yarn add mmm-html-parser
```

```bash
$ npm install --save-dev mmm-html-parser
```

#### Why?

I needed an Html parser that allowed me to anatomize a complex html structure, modify it, and serialize it while maintaining it's original, nuanced format and structure.

> Note: the ability to modify and serialize are not currently part of this library...but both are made easier

## Features
* it's ^riDiCuLoUsLy^ forgiving...as in it will
  * parse partial html that fails to include closing tags
  * parse invalid attributes
  * parse invalid closing tags for void elements will still be parsed (e.g. ```<input></input>``` ...yep, even Amazon has these invalid buggers in their code)
  * parse vue, angular, etc despite their non-compliant html syntax
  * ignore all content with code and script elements
* generate advanced objects (optional) allows you to get an out-of-the-box tree structure of the parsed html
* use this library as a singleton or instance
* flexible options like
  * add, edit, or remove known void elements (e.g. ```<img>```)
  * regex overrides (which I know is not the ideal approach) so you can use your own custom patterns
  * extending the TypeScript library (all non-public methods are 'protected' for your convenience)

#### Let's Get Real
* this is not the most performant parser out there (nor is it intended to be...though it could certainly be improved)

## Getting Started

You installed the npm package, right? Awesome! Now it's time to try it out. Sure, you could check out the examples, but that requires navigating the project and a slew of extra clicks. Perhaps this is more to your liking:

#### Basic Example

```js
new MmmHtmlParser().start('<input type="text" name="firstname" value="Mickey">');
```

#### Intermediate Example (Vue.js)

```js
// typescript
const root: MmmHtmlParserResultRootI = new MmmHtmlParser().start(`<li class="item"><div :class="{'type-tag': model.type === 'Tag', 'type-text': model.type === 'Text'}" @click="toggle" @dblclick="changeType"></div></li>`);
console.log('root.tagsTotalCount: ', root.tagsTotalCount);
console.log('root.tagsIgnoredCount: ', root.tagsIgnoredCount);
console.log('root.tagsOpenedCount: ', root.tagsOpenedCount);
console.log('- root.tagsClosedCount: ', root.tagsClosedCount);
console.log('= tagsRemainingCount: ', (root.tagsOpenedCount - root.tagsClosedCount));
console[root.tagsErrorCount > 0 ? 'warn' : 'log']('! tagsErrorCount', root.tagsErrorCount);
 
// outputs
root.tagsTotalCount:  4
root.tagsIgnoredCount:  0
root.tagsOpenedCount:  2
- root.tagsClosedCount:  2
= tagsRemainingCount:  0
! tagsErrorCount 0
```

## Coming Soon
* events
* a demo
* attribute parsing
* more edge-case support
* and always more forgiveness :blush:
