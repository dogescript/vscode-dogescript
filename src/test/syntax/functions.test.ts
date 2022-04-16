import * as vsctm from "vscode-textmate";
import { getDogeGrammar } from "./grammar.loader";

const grammar = getDogeGrammar();

describe("handles declaration", () => {
  test("no args", async () => {
    const text = [
      `such foo`
    ]
    let ruleStack = vsctm.INITIAL;

    const line = (await grammar).tokenizeLine(text[0], ruleStack);
    const tokens = line.tokens;

    expect(tokens[0].scopes).toContain("storage.type.function.dogescript");
    expect(tokens[2].scopes).toContain("entity.name.function.dogescript");
  });

  test("with args", async () => {
    const text = [
      `such foo much bar baz`
    ]
    let ruleStack = vsctm.INITIAL;

    const line = (await grammar).tokenizeLine(text[0], ruleStack);
    const tokens = line.tokens;

    const tokenMap = new Map();
    for (var token of tokens) {
      const tokenText = text[0].substring(token.startIndex, token.endIndex);
      tokenMap.set(tokenText, token.scopes);
    }

    expect(tokenMap.get("such")).toContain("storage.type.function.dogescript");
    expect(tokens[2].scopes).toContain("entity.name.function.dogescript");
    // much
    expect(tokens[4].scopes).toContain("meta.function.expr.dogescript");
    // "bar baz"
    expect(tokens[6].scopes).toContain("variable.parameter.dogescript");
  });
});
