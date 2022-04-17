import * as vsctm from "vscode-textmate";
import { getDogeGrammar } from "./grammar.loader";

const grammar = getDogeGrammar();

describe("handles comments", () => {
  test("handles single line", async () => {
    const text = [
      `shh single line comment`
    ]
    let ruleStack = vsctm.INITIAL;
    const tokenized = (await grammar).tokenizeLine(text[0], ruleStack);
    const lineTokens = tokenized.tokens;

    for (var token of lineTokens) {
      expect(token.scopes).toContain("comment.line.dogescript");
    }
  });

  test("handles single line", async () => {
    const text = [
      `quiet this is a long comment`
    ]
    let ruleStack = vsctm.INITIAL;
    const tokenized = (await grammar).tokenizeLine(text[0], ruleStack);
    const lineTokens = tokenized.tokens;

    for (var token of lineTokens) {
      expect(token.scopes).toContain("comment.block.dogescript");
    }
  });
});
