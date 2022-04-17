import { getDogeGrammar, TestHelper } from "./grammar.loader";
const grammar = getDogeGrammar();

describe("handles classes", () => {

  test("identifies this keyword", async () => {
    const text = [
      `dis giv bar is bleh`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("dis")).toContain("variable.language.this.dogescript");
  });

  test("identifies constructor keyword", async () => {
    const text = [
      `maker much length`
    ]

    const helper = new TestHelper((await grammar), text);
    const tokenMap = helper.getTokenizedLine();

    expect(tokenMap.get("maker")).toContain("meta.method.declaration.dogescript");
  });

  describe("handles class declaration", () => {
    test("identifies base class", async () => {
      const text = [
        `classy Shape`
      ]

      const helper = new TestHelper((await grammar), text);
      const tokenMap = helper.getTokenizedLine();

      expect(tokenMap.get("classy")).toContain("storage.type.class.dogescript");
      expect(tokenMap.get("Shape")).toContain("entity.name.class.dogescript");
    });

    test("identifies extension", async () => {
      const text = [
        `classy Square grows Shape`
      ]

      const helper = new TestHelper((await grammar), text);
      const tokenMap = helper.getTokenizedLine();

      expect(tokenMap.get("classy")).toContain("storage.type.class.dogescript");
      expect(tokenMap.get("Square")).toContain("entity.name.class.dogescript");
      expect(tokenMap.get("grows")).toContain("storage.class.modifier.dogescript");
      expect(tokenMap.get("Shape")).toContain("entity.other.inherited-class.dogescript");
    });

    test("handles getter", async () => {
      const text = [
        `classy Square grows Shape`,
        `git area`
      ]

      const helper = new TestHelper((await grammar), text);
      // consume class line
      helper.getTokenizedLine();
      const tokenMap = helper.getTokenizedLine();

      expect(tokenMap.get("git")).toContain("storage.type.method.dogescript");
      expect(tokenMap.get("area")).toContain("entity.name.function.dogescript");
    });

    test("handles setter", async () => {
      const text = [
        `classy Square grows Shape`,
        `sit length much size`
      ]

      const helper = new TestHelper((await grammar), text);
      // consume class line
      helper.getTokenizedLine();
      const tokenMap = helper.getTokenizedLine();

      expect(tokenMap.get("sit")).toContain("storage.type.method.dogescript");
      expect(tokenMap.get("length")).toContain("entity.name.function.dogescript");
      expect(tokenMap.get("much")).toContain("meta.function.expr.dogescript");
      expect(tokenMap.get("size")).toContain("variable.parameter.dogescript");
    });

    test("handles static", async () => {
      const text = [
        `classy Square grows Shape`,
        `stay sides`
      ]

      const helper = new TestHelper((await grammar), text);
      // consume class line
      helper.getTokenizedLine();
      const tokenMap = helper.getTokenizedLine();

      expect(tokenMap.get("stay")).toContain("storage.modifier.static.dogescript");
      expect(tokenMap.get("sides")).toContain("entity.name.function.dogescript");
    });

    test("handles static with args", async () => {
      const text = [
        `classy Square grows Shape`,
        `stay area much len width`
      ]

      const helper = new TestHelper((await grammar), text);
      // consume class line
      helper.getTokenizedLine();
      const tokenMap = helper.getTokenizedLine();

      expect(tokenMap.get("stay")).toContain("storage.modifier.static.dogescript");
      expect(tokenMap.get("area")).toContain("entity.name.function.dogescript");
      expect(tokenMap.get("much")).toContain("meta.function.expr.dogescript");
      expect(tokenMap.get("len width")).toContain("variable.parameter.dogescript");
    });
  });
});
