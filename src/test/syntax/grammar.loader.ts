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

export function getDogeGrammar() {
  const jsonGrammar = path.join(__dirname, "../../../syntaxes/dogescript.tmLanguage.json");
  const content = fs.readFileSync(jsonGrammar).toString();
  const rawGrammer = vsctm.parseRawGrammar(content, jsonGrammar);
  const grammar = registry.addGrammar(rawGrammer);
  return grammar;
}
