const vscode = require('vscode')
// const AzInfo = require('./components/AzureDevOpsInfo')
const ListBuildInfoProvider = require('./components/sidebarBuildProvider')
function activate(context) {
	const dataPath = "/workspaces/azure-devops-extension/resources/data/scrubedData.json"
	const TreeDataProvider = new ListBuildInfoProvider.ListBuildInfoProvider(dataPath)
	vscode.window.registerTreeDataProvider("build-list",TreeDataProvider)
	vscode.commands.registerCommand(
		'extension.openAzureDevOpsBuildlink', 
		url => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${url}`))
	);
}
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
