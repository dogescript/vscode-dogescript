import * as vsctm from "vscode-textmate";
import { getDogeGrammar } from "./grammar.loader";

const grammar = getDogeGrammar();


test("handles variable and var name", async () => {
  const text = [
    `very foo is 'wow'`
  ]
  let ruleStack = vsctm.INITIAL;
  const tokenized = (await grammar).tokenizeLine(text[0], ruleStack);
  const lineTokens = tokenized.tokens;

  const varToken = lineTokens[0];
  const varNameToken = lineTokens[2];

  expect(varToken.scopes).toContain("variable.language.dogescript")
  expect(varNameToken.scopes).toContain("variable.name.dogescript")
});
