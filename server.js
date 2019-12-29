// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
let date_string = req.params.date_string;
  let utcString;
  let unixString;
  
  if(date_string==null){
    date_string = new Date();
    
    utcString=new Date(date_string).toUTCString();
    unixString=new Date(date_string).getTime();
    
    return res.json({unix: unixString,utc:utcString});
  }    
  
  if(!date_string.toString().includes("-")){
    
    let nD=new Date();
    nD.setTime(date_string);
    
    utcString=nD.toUTCString();
    unixString=date_string;
    
    return res.json({unix: unixString,utc:utcString});  
  }
  
  utcString=new Date(date_string).toUTCString();
  unixString=new Date(date_string).getTime();
  
  console.log(date_string,unixString,utcString)
  
  if(unixString==null||utcString=="Invalid Date"){
    return res.json({error: "Invalid Date"});}
  
  res.json({unix: unixString,utc:utcString});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});