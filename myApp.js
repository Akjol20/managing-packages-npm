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

app.get('/now', function(req, res, next){
  req.time = new Date().toUTCString();
  next();
},
  function(req, res) {
    res.send({"time": req.time});
  }       
);
module.exports = app;

 