var https = require('https');


module.exports = function getHTML(options, callback) {
  var inputStorage = '';

  var requestOptions = {
    host: 'sytantris.github.io',
    path: '/http-examples/step6/reverse.html'
  };
    https.get(requestOptions, function(response) {
      response.setEncoding('utf-8');

      response.on('data', function(data) {
        inputStorage +=  data;
      });

      response.on('end', function() {
         callback(inputStorage);
      });
    });
  }
