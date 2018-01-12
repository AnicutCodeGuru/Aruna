const express = require('express')
const app = express()
const request = require('request');
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

app.use('/status', express.static('app'))

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/hdfc', (req, res) => {
	    console.log(req.body);   
		var mobile = req.body.mobile;
		var AppNo = req.body.appNo;
		var url = "https://leads.hdfcbank.com/applications/webforms/apply/cc_track/cc_track_process.asp?txtAppRefNum=&txtAppFormNum="+AppNo+"&txtMobileNum="+mobile+"&txtDOB=DD/MM/YYYY&hidIPAddress=&sid=0.04352988627247356";
	     console.log(url);
	   request.get({ url:url},      function(error, response, body) { 
		  if (!error && response.statusCode == 200) { 
		       res.send({test:body})
			 } 
		 });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))




  /***
7204675893
9480823127

CC34207617
CC34207596
  ***/