/*jslint node: true */
"use strict";


var soap = require('soap');
var express = require('express');
var fs = require('fs');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
}


// the splitter function, used by the service
function ordering_function(args) {
    console.log('ordering_function');
    var part_number = args.part_number;
    var price = String(Math.round(Math.random() * 100)) + " USD"
    var date = String(randomDate(new Date(),new Date(2023, 12, 31),))

    return {
        Date: date,
        Price: price
        }
}

// the service
var serviceObject = {
    OrderingService: {
        OrderingServiceSoapPort: {
            OrderParts: ordering_function
        }
    }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 8001;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});