import { TestHelper, getDogeGrammar } from "./grammar.loader";
const grammar = getDogeGrammar();

describe("marks all keywords", () => {

  test("handles trained", async () => {
    const text = [
      `trained`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("trained")).toContain("keyword.other.strict.dogescript");
  });

  test.each([
    ['debooger'], ['pawse']
  ])("categorizes %p as debugger", async (operator: string) => {
    const text = [
      `${operator}`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get(operator)).toContain("keyword.other.debugger.dogescript");
  });
})
test("handles variable and var name", async () => {
  const text = [
    `very foo is 'wow'`
  ]

  const helper = new TestHelper((await grammar), text);
  const tokenMap = helper.getTokenizedLine();

  expect(tokenMap.get("very")).toContain("variable.language.dogescript")
  expect(tokenMap.get("foo")).toContain("variable.name.dogescript")
});
