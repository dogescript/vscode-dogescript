import { TestHelper, getDogeGrammar } from "./grammar.loader";
const grammar = getDogeGrammar();

test("handles variable and var name", async () => {
  const text = [
    `very foo is 'wow'`
  ]

  const helper = new TestHelper((await grammar), text);
  const tokenMap = helper.getTokenizedLine();

  expect(tokenMap.get("very")).toContain("variable.language.dogescript")
  expect(tokenMap.get("foo")).toContain("variable.name.dogescript")
});
