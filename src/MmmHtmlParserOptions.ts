export class MmmHtmlParserOptions {
  public generateAdvancedObjects: boolean = true; // whether to create advanced object with features like children allowing for full node tree
  public regexPatternAllTags: RegExp = /<.*?[\s\S]*?>/g; // regex for opening and self-closing tags (while accounting for line tags spanning multiple lines)
  public regexPatternComment: RegExp = /<![\s\S]*?>/g; // regex for html comment
  public regexPatternTagName: RegExp = /<([^\s>]+)(\s|)+/; // regex tag element name
  public trimRootWhitespace: boolean = true; // whether to trim left and right space from initial markup being parsed
  public includeEmptyInnerText: boolean = false; // whether to include empty text (all whitespace) in advanced objects and firing events
  public voidElements: {[element: string]: boolean} = {
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
  public ignoreInnerTagElements: {[tagName: string]: boolean} = { // list of elements tag names in which inner contents should be ignored (don't process in any tags or text)
    script: true,
    code: true
  };
}
