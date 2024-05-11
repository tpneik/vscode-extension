// const axios = require('axios')
// const ORGANIZATION = "20521491"
// const REPO_ID = 'kienpt_learning'

// const PROJECT = "kienpt_learning"
// const BUILD_ID = "1"
// //--------------------API LINK AREA-----------------------//

// const LINK_TO_CHECK_REPO = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/${REPO_ID}?api-version=7.2-preview.1`
// const LINK_TO_CHECK_REPOS = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories?api-version=7.2-preview.1`
// // const LINK_TEST_API = `https://dev.azure.com/${ORGANIZATION}/_apis/projects?api-version=2.0`
// const URL_TO_CHECK_COMMIT = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/build/builds/${BUILD_ID}?api-version=7.0`
// const listbuild = ` https://dev.azure.com/20521491/kienpt_learning/_apis/build/builds?api-version=4.1`
// const get_commit = `https://dev.azure.com/${ORGANIZATION}/${PROJECT}/_apis/git/repositories/8c9ae63f-0e2a-4077-bf72-069ccbc36934/commits?api-version=7.1-preview.1`

// //--------------------API LINK AREA-----------------------//

// axios.interceptors.request.use(function (config) {
//   config.auth = {
			// 	username: `${process.env.USERNAME}`,
			// 	password: `${process.env.PASSWORD}`
			// }
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// function getCommitId(organization, project, buildId){
//   const URL = `https://dev.azure.com/${organization}/${project}/_apis/build/builds/${buildId}?api-version=7.0`
//   axios.get(URL).then(response=> {
//     const data = JSON.stringify(response?.data?.triggerInfo["ci.sourceSha"] || "NOT OBJECT");
//     console.log(data)
//   })
// }

// function getGethubLink(organization, project, buildId){
//   const URL = `https://dev.azure.com/${organization}/${project}/_apis/build/builds/${buildId}?api-version=7.0`
//   axios.get(URL).then(response=> {
//     const data = JSON.stringify(response?.data?._links.sourceVersionDisplayUri.href || "NOT OBJECT");
//     console.log(data)
//   })
// }

// getGethubLink(ORGANIZATION, PROJECT, BUILD_ID)

// ----------------------------------

const AzInfo = require('./AzureDevOpsInfo')
let abc = async () => {
  let githubLink = await AzInfo.getGethubLink(1)
  let commitId = await AzInfo.getCommitId(1)
  console.log([githubLink, commitId])
}

abc()

//const azureinfo = new azureDevOpsInfo()
// Promise.all([azureDevOpsInfo.getGethubLink(1), azureDevOpsInfo.getGethubLink(2), azureDevOpsInfo.getGethubLink(3)]).then(
//   value =>{
//     console.log(value);
//   }
// )

// console.log("First")
// ----------------------------------

// -- axios là async sao nó vẫn trả về pending
// let data = axios.get('http://localhost:3000/').then(response => {response.data})

// console.log(data)


