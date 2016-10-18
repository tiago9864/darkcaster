

var express = require('express');
var server = express();
var logger = require('./middleware/logger.js');
var cors = require('cors');
var axios = require('axios');
var apiKey = require('./config.js').apiKey;

var port = process.env.PORT || 8080;

server.use(express.static(__dirname + '/public'));
server.use(logger);
server.use(cors());

server.get('/', function(request, response){
  response.sendFile('public/html/index.html', {root: __dirname});
});

server.get('/forecast/:latitude,:longitude', function(request, response){
  var url = 'https://api.darksky.net/forecast/'+ apiKey +'/'+ request.params.latitude +',-122.4233';
  var timeoutConfig = {
    timeout: 2000
  };
  axios.get(url, timeoutConfig)
        .then(function(forecast){
          response.send(forecast.data);
        })
        .catch(function(error){
          response.send(error);
        });
});

server.listen(port, function(){
  console.log('Now listening on port', port);
});
