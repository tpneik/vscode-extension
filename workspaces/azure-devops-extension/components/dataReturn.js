const vscode = require('vscode')
const path = require('path')

class BuildInfoInDetail extends vscode.TreeItem {
        constructor(label, buildId, buildIndex, collapsibleState, iconPath, command) {
            super(label, collapsibleState);
            this.label = label;
            this.collapsibleState = collapsibleState;
            this.command = command;
            this.iconPath = iconPath==""?{
                light: path.join(__filename, '..', '..', 'resources', 'light', 'childElement.svg'),
                dark: path.join(__filename, '..', '..', 'resources', 'dark', 'childElement.svg')
            } : iconPath;
            this.tooltip = "click here for more!"
            this.description = `${buildId}`;
            this.toIndex = buildIndex;
        }
    }
module.exports  = BuildInfoInDetail;