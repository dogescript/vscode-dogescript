import * as vsctm from "vscode-textmate";

import { getDogeGrammar } from "./grammar.loader";

const grammar = getDogeGrammar();

describe("handles strings", () => {
  test("handles single quotes", async () => {
    const text = [
      `'this is a long string'`
    ]
    let ruleStack = vsctm.INITIAL;
    const tokenized = (await grammar).tokenizeLine(text[0], ruleStack);
    const lineTokens = tokenized.tokens;

    for (var token of lineTokens) {
      expect(token.scopes).toContain("string.quoted.single.dogescript");
    }
  });
});

