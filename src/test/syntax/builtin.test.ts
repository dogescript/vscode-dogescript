import { TestHelper, getDogeGrammar } from "./grammar.loader";
const grammar = getDogeGrammar();

describe("handles built in keywords", () => {

  test.each([
    ['windoge'], ['dogeument']
  ])("categorizes %p as support variable", async (operator: string) => {
    const text = [
      `${operator} giv foo`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get(operator)).toContain("support.variable.dogescript");
  });

  test("handles console.loge as function", async () => {
    const text = [
      `console.loge`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("console.loge")).toContain("support.function.dogescript");
  });

});
