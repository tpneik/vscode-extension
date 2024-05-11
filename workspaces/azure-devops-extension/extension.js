
const vscode = require('vscode')
const AzInfo = require('./components/AzureDevOpsInfo')
/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {


	console.log('Congratulations, your extension "azure-devops-extension" is now active!');

	let disposable = vscode.commands.registerCommand('azure-devops-extension.helloWorld', function () {
		try{
			AzInfo.getCommitId(1).then(response => {
				vscode.window.showInformationMessage(response)
			})
		} catch(error){
			console.log(error)
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
