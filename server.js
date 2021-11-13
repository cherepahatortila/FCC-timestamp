// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname +'/views/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
var inputDate=Date.now();
 req.params.date
 ?inputDate=new Date(req.params.date)
 :inputDate;

  inputDate=="Invalid Date"
  ?inputDate=new Date(Number(req.params.date))
  :inputDate;

var stringFromDate=req.params.date?inputDate.toString():new Date(inputDate).toString();

  var weekDay=stringFromDate.slice(0,3);
  var monthDay=stringFromDate.slice(8,10);
  var month=stringFromDate.slice(4,7);
  var yearAndTime=stringFromDate.slice(11,28);

 if(inputDate=='Invalid Date'){
  res.send({error:"Invalid Date"})
  }
  else {
  res.send({unix:req.params.date?inputDate.getTime():inputDate, utc:`${weekDay}, ${monthDay} ${month} ${yearAndTime}`})
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
