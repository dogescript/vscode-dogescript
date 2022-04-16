import * as vsctm from "vscode-textmate";
import { getDogeGrammar } from "./grammar.loader";

const grammar = getDogeGrammar();


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


