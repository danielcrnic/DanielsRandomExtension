import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('danielsrandomextension.joinLinesWithSuffix', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			let numberOfLines = document.lineCount - 1;
			while(document.lineAt(numberOfLines).isEmptyOrWhitespace) {
				numberOfLines--;
			}

			var stringToReturn = document.lineAt(0).text;
			for (let i = 1; i <= numberOfLines; i++) {
				stringToReturn = stringToReturn.concat('\\n', document.lineAt(i).text);
			}

			editor.edit(builder => {
				builder.replace(new vscode.Range(document.lineAt(0).range.start, document.lineAt(document.lineCount - 1).range.end), stringToReturn)
			});

			// TODO: Fix this later
			if (selection.start.isEqual(selection.end)) {
				console.log("nothing is selected")
			}
			else {
				console.log("something is selected :)")
			}
		}
		else {
			vscode.window.showInformationMessage('No active editor exists');
		}

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
