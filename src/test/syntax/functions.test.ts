import { TestHelper, getDogeGrammar } from "./grammar.loader";

const grammar = getDogeGrammar();

describe("handles declaration", () => {
  test("no args", async () => {
    const text = [
      `such foo`
    ]
    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("such")).toContain("storage.type.function.dogescript");
    expect(tokenMap.get("foo")).toContain("entity.name.function.dogescript");
  });

  test("with args", async () => {
    const text = [
      `such foo much bar baz`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("such")).toContain("storage.type.function.dogescript");
    expect(tokenMap.get("foo")).toContain("entity.name.function.dogescript");
    expect(tokenMap.get("much")).toContain("meta.function.expr.dogescript");
    expect(tokenMap.get("bar baz")).toContain("variable.parameter.dogescript");
  });
});

describe("handles function calling", () => {
  test("with args", async () => {
    const text = [
      `plz foo with bar`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("plz")).toContain("keyword.other.function.call.dogescript");
    expect(tokenMap.get("foo")).toContain("entity.name.function.dogescript");
    expect(tokenMap.get("with")).toContain("keyword.other.call.operator.dogescript");
  });
  test("dose call", async () => {
    const text = [
      `console dose log`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("console")).toContain("entity.name.dogescript");
    expect(tokenMap.get("dose")).toContain("keyword.other.function.call.dogescript");
    expect(tokenMap.get("log")).toContain("entity.name.function.dogescript");
  });
});