var express = require('express');
const res = require('express/lib/response');
var app = express();
require('dotenv').config();


app.use((req,res,next) => {
   console.log(req.method +" "+ req.path +" - "+ req.ip)
  next();
})


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
    var jsonRes = {"message":"Hello json"};
    
    if(process.env.MESSAGE_STYLE === "uppercase"){
         jsonRes.message = jsonRes.message.toUpperCase()
    }
    res.json(jsonRes)
})

var delayInMilliseconds = 1000; //1 second

app.get('/now', (req, res, next) => {
     req.time = new Date().toString();
     next()
}, (req, res) => {
setTimeout(function() {
  //your code to be executed after 1 second
    res.json({
      'time': req.time
    })
}, delayInMilliseconds);
})

module.exports = app;

 