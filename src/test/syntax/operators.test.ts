import { TestHelper, getDogeGrammar } from "./grammar.loader";
const grammar = getDogeGrammar();

describe("handles operators", () => {

  test.each([
    ['bigify'],
    ['bigified'],
    ['smallify'],
    ['smallified'],
    ['waite'],
    ['yelde'],
    ['not'],
    ['is'],
    ['and'],
    ['or'],
    ['bigger'],
    ['smaller'],
    ['biggerish'],
    ['smallerish'],
    ['isa'],
    ['like'],
    ['same']
  ])("categorizes %p as operator", async (operator: string) => {
    const text = [
      `${operator}`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get(operator)).toContain("keyword.operator.dogescript");
  });

  test("handles new", async () => {
    const text = [
      `x is new Array`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("new")).toContain("keyword.operator.new.dogescript");
  });

  test("handles kindof", async () => {
    const text = [
      `kindof foo`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("kindof")).toContain("keyword.operator.expression.typeof.dogescript");
  });

  test.each([
    ['giv'], ['levl']
  ])("categorizes %p as property accessor", async (operator: string) => {
    const text = [
      `${operator} 0`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get(operator)).toContain("keyword.operator.property.accessor.dogescript");
  });
});