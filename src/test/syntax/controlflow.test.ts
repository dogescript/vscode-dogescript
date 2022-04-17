import { TestHelper, getDogeGrammar } from "./grammar.loader";
const grammar = getDogeGrammar();

describe("handles control flow keywords", () => {

  test.each([
    ['rly'], ['many'], ['amaze'], ['much'], ['bork'], ['but']
  ])("categorizes %p as control", async (operator: string) => {
    const text = [
      `${operator}`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get(operator)).toContain("keyword.control.dogescript");
  });

  test("handles next", async () => {
    const text = [
      `much foo as 0 next`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("next")).toContain("keyword.other.terminator.dogescript");
  });

  test("handles thx", async () => {
    const text = [
      `plz foo thx`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("thx")).toContain("keyword.other.chain.dogescript");
  });

  test.each([
    ['wow'], ['wow&']
  ])("categorizes %p as terminator", async (operator: string) => {
    const text = [
      `${operator}`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get(operator)).toContain("keyword.control.terminator.dogescript");
  });
});