var express = require('express');
const res = require('express/lib/response');
var app = express();
require('dotenv').config()
console.log("Hello World")

app.use("/public",express.static(__dirname +'/public'))

app.get('/',(req,res) =>{
    res.sendFile(__dirname + "/views/index.html")
  });

// app.get("/json",(req,res) => {
//     res.json({
//         "message":"Hello json"
//     })
// })


app.get('/json',(req,res)=>{
    console.log(process.env.MESSAGE_STYLE) 
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message":"HELLO WORLD"})
    }else {
        res.json({"message":"Hello json"})
    }
})
module.exports = app;