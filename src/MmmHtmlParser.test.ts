import {MmmHtmlParser} from "./MmmHtmlParser";

describe(
  'EmitterSystem Tests',
  () => {
    test("Simple sum", () => {
      expect(new MmmHtmlParser().start()).toBe(true);
    });
  }
);
