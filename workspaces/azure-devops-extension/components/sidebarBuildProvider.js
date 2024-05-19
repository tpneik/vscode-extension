"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = exports.DepNodeProvider = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const SidebarDataProvider = require("./sidebarBuildProviderMoreInfo")
const BuildInfoInDetail = require('./dataReturn')

class ListBuildInfoProvider{
    constructor(jsonDatafile) {
        this.azDevOpsInfo = jsonDatafile;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if(!this.azDevOpsInfo){
            vscode.window.showInformationMessage('No information json file found')
            return
        }
        const azData = JSON.parse(fs.readFileSync(this.azDevOpsInfo, 'utf-8'));
        if(element){
            console.log("--------------------------------------")
            console.log("This function call SidebarDataProvider")
            vscode.window.registerTreeDataProvider("build-in-detail",new SidebarDataProvider(azData.value[element.toIndex]))
            console.log(azData.value[element.toIndex])
            console.log("--------------------------------------")
            if(element.collapsibleState==1 && element.label=="Trigger Info"){
                let param = azData.value[element.toIndex].triggerInfo

                console.log(element.iconPath)

                return Promise.resolve(this.getBuildInJsonInfoElement(param, element.toIndex));
            }else{
                console.log(`Index: ${element.toIndex}`)
                vscode.window.showInformationMessage(`Successfully called element update!`)
                const valuateIndex = element.toIndex
                return Promise.resolve(this.getBuildInJsonInfoElement(azData.value[element.toIndex], valuateIndex));
            }
        }
        else{
            
            return Promise.resolve(this.getBuildInJsonInfoRoot(azData));
        }
    }
    /////-------- Parameter of this is variable with json data --------------
    getBuildInJsonInfoRoot(azData){
        const azDevOpsInfo = this.azDevOpsInfo
        const azDataValue = azData.value
        if (this.pathExists(azDevOpsInfo)){
            const toIndex = (buildNumber, buildId, buildIndex) => {
                console.log("--------------- Root is picked!-------------")
                return new BuildInfoInDetail(buildNumber, buildId, buildIndex, vscode.TreeItemCollapsibleState.Collapsed,"")
            }
            const BuildId = azData
                ? Object.keys(azDataValue).map(buildIndex => {
                    console.log("------------------------------------------------------")
                    console.log(azDataValue[buildIndex].buildNumber)
                    console.log(azDataValue[buildIndex].id)
                    return toIndex("Build ", azDataValue[buildIndex].id, buildIndex)
                }) : [];
            console.log(BuildId)
            return BuildId
        }
    }

    //--Do later !
    getBuildInJsonInfoElement(azData, Index){
        const azDevOpsInfo = this.azDevOpsInfo
        const azDataValue = azData
        if (this.pathExists(azDevOpsInfo)){
            const toIndex = (label, value, iconPath, commands) => {
                if(label!="Trigger Info"){
                    // constructor(label, buildId, buildIndex, collapsibleState, iconPath, command)
                    return new BuildInfoInDetail(label, value, "", vscode.TreeItemCollapsibleState.None, iconPath, commands)
                }else{
                    // toIndex("Trigger Info","", Index)
                    return new BuildInfoInDetail(label, "", value, vscode.TreeItemCollapsibleState.Collapsed, {
                                light: path.join(__filename, '..', '..', 'resources', 'light', 'trigger.svg'),
                                dark: path.join(__filename, '..', '..', 'resources', 'dark', 'trigger.svg')
                            }, commands)
                }
            } 
            console.log(Index)
            console.log(Object.keys(azDataValue))
            const BuildId = azData
                ? Object.keys(azDataValue).map(buildIndex => {
                    ////-----------------Place for LINK-------------------//
                    if(buildIndex=="link"){
                        return toIndex("Link: ", "Click To Redirect ","", {
                            command: 'extension.openAzureDevOpsBuildlink',
                            title: '',
                            arguments: [azDataValue[buildIndex]]
                        })
                    }
                    ////-----Place for ID--------//
                    if(buildIndex=="id"){
                        return toIndex("ID: ", azDataValue[buildIndex],"")
                    }
                    ////-----Place for STATUS--------//
                    if(buildIndex=="status"){
                        return toIndex("Status: ", azDataValue[buildIndex]=="completed"?"COMPLETED":"IN PROGRESS",azDataValue[buildIndex]=="completed"?{
                            light: path.join(__filename, '..', '..', 'resources', 'light', 'complete.svg'),
                            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'complete.svg')
                        }:"")
                    }
                    ////-----Place for RESULT--------//
                    if(buildIndex=="result"){
                        return toIndex("Result: ", azDataValue[buildIndex]=="succeeded"?"SUCCESS":"FAILED",azDataValue[buildIndex]=="succeeded"?{
                            light: path.join(__filename, '..', '..', 'resources', 'light', 'success.svg'),
                            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'success.svg')
                        }:{
                            light: path.join(__filename, '..', '..', 'resources', 'light', 'failed.svg'),
                            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'failed.svg')
                        })
                    }
                    ////-----Place for RESULT--------//
                    if(buildIndex=="buildNumber"){return toIndex("BuildNum: ", azDataValue[buildIndex],"")}
                    ////-----Place for requestFor--------//
                    if(buildIndex=="requestFor"){return toIndex("By: ", azDataValue[buildIndex],"")}
                    ////-----Place for trigger Info--------//
                    if(buildIndex=="triggerInfo"){return toIndex("Trigger Info", Index)}
                    ////-----Place for ci.sourceBranch--------//
                    if(buildIndex=="ci.sourceBranch"){return toIndex("Src Branch:", azDataValue[buildIndex], "")}
                    ////-----Place for ci.sourceSha--------//
                    if(buildIndex=="ci.sourceSha"){return toIndex("Src SHA:", azDataValue[buildIndex], "")}
                    ////-----Place for ci.message--------//
                    if(buildIndex=="ci.message"){return toIndex("Message:", azDataValue[buildIndex], "")}
                    
                }) : [];
            console.log(BuildId)
            return BuildId
        }
    }
    pathExists(p) {
        try {
            fs.accessSync(p);
        }
        catch (err) {
            return false;
        }
        return true;
    }

}
exports.ListBuildInfoProvider = ListBuildInfoProvider;
