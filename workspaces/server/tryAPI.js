const axios = require('axios')

async function callAPI (){
    return await axios.get('http://localhost:3000/')
}
const mydata = callAPI() //axios.get('http://localhost:3000/').then(reponse => {reponse.data})

console.log(mydata)