import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

async function doc(content: string, language?: string) {
	return await vscode.workspace.openTextDocument({
		language,
		content,
	});
}

async function openFile(content: string): Promise<vscode.TextDocument> {
	const document = doc(content, "dogescript");
	vscode.window.showTextDocument(await document);
	return document;
}

suite('Extension Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');


	test('Sample', async () => {
		const document = openFile('very foo');
		// TODO get the right as vscode.X here
		// vscode.languages.getTokenInformationAtPosition
		vscode.commands.executeCommand('editor.contrib.inspectEditorTokens', (await document).uri).then((res) => {
			console.log(res);
		}, (err) => { console.log(err) });
	});
});