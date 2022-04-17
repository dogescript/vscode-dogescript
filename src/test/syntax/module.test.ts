import { getDogeGrammar, TestHelper } from "./grammar.loader";
const grammar = getDogeGrammar();


describe("handles module operations", () => {

  test("handles import", async () => {
    const text = [
      `so tape`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("so")).toContain("keyword.other.module.import.dogescript");
    expect(tokenMap.get("tape")).toContain("meta.module.name.dogescript");
  });

  test("handles named import", async () => {
    const text = [
      `so tape as tp`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("so")).toContain("keyword.other.module.import.dogescript");
    expect(tokenMap.get("tape")).toContain("meta.module.name.dogescript");
    expect(tokenMap.get("as")).toContain("meta.import.operator.dogescript");
    expect(tokenMap.get("tp")).toContain("meta.import.name.dogescript");
  });

  test("handles export", async () => {
    const text = [
      `woof foo`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("woof")).toContain("keyword.other.module.export.dogescript");
    expect(tokenMap.get("foo")).toContain("meta.export.name.dogescript");
  });

  test("handles named export", async () => {
    const text = [
      `woof foo be bar`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("woof")).toContain("keyword.other.module.export.dogescript");
    expect(tokenMap.get("foo")).toContain("meta.export.name.dogescript");
    expect(tokenMap.get("be")).toContain("keyword.other.module.export.declaration.dogescript");
  });
});