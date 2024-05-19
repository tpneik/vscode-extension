"use strict";
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config({ path: '/workspaces/azure-devops-extension/.env'});


class AzureDevOpsInfo{
		static baseUrl = "https://dev.azure.com"
		static organization = "20521491"
		static project = "kienpt_learning"
		static apiVersion = "7.0"

		static api = axios.create({
			auth: {
				username: `${process.env.USERNAME}`,
				password: `${process.env.PASSWORD}`
			},
			responseType: 'json'
		})

		static async getGethubLink(buildId, {organization, project, apiVersion} = {}){
			const URL = `${this.baseUrl}/${organization||this.organization}/${project||this.project}/_apis/build/builds/${buildId}?api-version=${apiVersion||this.apiVersion}`
			let data = await this.api.get(URL).then(response=> {
				return response?.data?._links?.sourceVersionDisplayUri.href || "NOT OBJECT";	
			})
			return data
		}
		
		static async getCommitId(buildId, {organization, project, apiVersion} = {}){
			console.log([process.env.USERNAME, process.env.PASSWORD])
			const URL = `${this.baseUrl}/${organization||this.organization}/${project||this.project}/_apis/build/builds/${buildId}?api-version=${apiVersion||this.apiVersion}`
			let data = await this.api.get(URL).then(response=> {
				return response?.data?.triggerInfo["ci.sourceSha"] || "NOT OBJECT"	
			})
			return data
		}

		static async getListBuild({organization, project, apiVersion} = {}){
			// https://dev.azure.com/20521491/kienpt_learning/_apis/build/builds?api-version=4.1
			const URL = `${this.baseUrl}/${organization||this.organization}/${project||this.project}/_apis/build/builds/?api-version=${apiVersion||this.apiVersion}`
			let data = await this.api.get(URL).then(response=> {
				return response?.data?.value || "NOT OBJECT"	
			})
			return data
		}
			
}

module.exports = AzureDevOpsInfo