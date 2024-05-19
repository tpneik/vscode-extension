'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Dependency = exports.DepNodeProvider = void 0
const vscode = require('vscode')
const fs = require('fs')
const dataReturn = require('./dataReturn')

class sidebarViewProvider {
  constructor (dataObject) {
    this.azDevOpsInfo = dataObject
    this._onDidChangeTreeData = new vscode.EventEmitter()
    this.onDidChangeTreeData = this._onDidChangeTreeData.event
  }
  refresh () {
    this._onDidChangeTreeData.fire()
  }
  getTreeItem (element) {
    return element
  }
  getChildren () {
    // this.refresh()
    console.log("--------------------------------------")
    console.log('This is Sidebar view Provider!!')
    console.log("--------------------------------------")
    const toIndex = (buildNumber, buildId, buildIndex) =>
      new dataReturn(
        buildNumber,
        buildId,
        buildIndex,
        vscode.TreeItemCollapsibleState.None
      )
    console.log("--------------------------------------")
    console.log('This is Sidebar Data!!')
    console.log(this.azDevOpsInfo)
    console.log("--------------------------------------")
    const BuildId = this.azDevOpsInfo
      ? Object.keys(this.azDevOpsInfo).map(buildIndex => {
          console.log("--------------------------------------")
          console.log(buildIndex)
          console.log("--------------------------------------")
          return toIndex("BuildNum: ", this.azDevOpsInfo[buildIndex],"")
        })
      : []
    console.log("--------------------------------------")
    console.log(BuildId)
    console.log("-------------This is BuildID Array-------------")
    console.log("--------------------------------------")
    return BuildId
  }
  pathExists (p) {
    try {
      fs.accessSync(p)
    } catch (err) {
      return false
    }
    return true
  }
}
module.exports = sidebarViewProvider