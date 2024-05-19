const fs = require('fs');

const input = "/workspaces/azure-devops-extension/resources/data/rawData.json"
const output = "/workspaces/azure-devops-extension/resources/data/scrubedData.json"
const rawData = fs.readFileSync(input); 
const data = JSON.parse(rawData);

// Array to store transformed data
const transformedData = {
    value: data.value.map(buildItem => ({
        id: buildItem.id,
        status: buildItem.status,
        result: buildItem.result,
        link: buildItem._links.web.href, 
        triggerInfo: buildItem.triggerInfo,
        buildNumber: buildItem.buildNumber,
        requestFor: buildItem.requestedFor.displayName
    }))
};


const outputJson = JSON.stringify(transformedData, null, 2);

fs.writeFileSync(output, outputJson);