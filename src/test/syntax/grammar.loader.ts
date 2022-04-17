import * as fs from "fs";
import * as path from "path";
import * as vsctm from "vscode-textmate";
import * as oniguruma from "vscode-oniguruma";

const wasmBin = fs.readFileSync(path.join(__dirname, '../../.././node_modules/vscode-oniguruma/release/onig.wasm')).buffer;
const vscodeOnigurumaLib = oniguruma.loadWASM(wasmBin).then(() => {
  return {
    createOnigScanner(patterns: any) { return new oniguruma.OnigScanner(patterns); },
    createOnigString(s: any) { return new oniguruma.OnigString(s); }
  };
});

// Create a registry that can create a grammar from a scope name.
const registry = new vsctm.Registry({
  onigLib: vscodeOnigurumaLib,
  loadGrammar: (scopeName) => {
    return Promise.resolve(null);
  }
});

const jsonGrammar = path.join(__dirname, "../../../syntaxes/dogescript.tmLanguage.json");
const content = fs.readFileSync(jsonGrammar).toString();
const rawGrammar = vsctm.parseRawGrammar(content, jsonGrammar);
const dogeGrammar = registry.addGrammar(rawGrammar);

export function getDogeGrammar() {
  return dogeGrammar;
}

export class TestHelper {
  lines: string[];
  currLine: number = 0;
  grammar: vsctm.IGrammar;

  ruleStack = vsctm.INITIAL;

  constructor(grammar: vsctm.IGrammar, lines: string[]) {
    this.lines = lines;
    this.grammar = grammar;
  }

  /**
   * 
   * @returns a map of the current tokenized line. Subsequent calls to this advance to the next tokenization.
   */
  getTokenizedLine(): Map<String, String[]> {
    const text = this.lines[this.currLine];

    const line = this.grammar.tokenizeLine(text, this.ruleStack);
    const tokens = line.tokens;

    const tokenMap = new Map();
    for (var token of tokens) {
      const tokenText = text.substring(token.startIndex, token.endIndex);
      tokenMap.set(tokenText, token.scopes);
    }

    // increment next
    this.currLine++;

    return tokenMap;
  }
}
