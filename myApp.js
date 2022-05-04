var express = require('express');
const res = require('express/lib/response');
var app = express();
require('dotenv').config();
var bodyParser  = require('body-parser');

app.use((req,res,next) => {
   console.log(req.method +" "+ req.path +" - "+ req.ip)
  next();
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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


app.get('/now', (req, res, next)=>{
  req.time = new Date(Date.now() - 19000).toString();
  next();
}, (req, res)=>{
  res.json({time: req.time});
});


app.get("/:word/echo",(req,res) => {
    res.json({echo:req.params.word})
})
app.get("/name",(req,res) => {
   res.json({name:req.query.first +" "+req.query.last});
})

module.exports = app;

 