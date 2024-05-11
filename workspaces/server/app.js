const express = require('express')

const app = express()

const jsondata = {
    "name": "Helloooo Phan Trung Kieen"
}

app.get('/', (req, res)=>{
    res.send(jsondata)
})

app.listen(3000)