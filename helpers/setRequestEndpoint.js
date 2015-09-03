var request = require('request');
var cookieJar = request.jar();


function setCookiesOnJar(cookiesString) {
  var cookiesURL = "http://micampus.mxl.cetys.mx";
  var cookies = cookiesString.split(" ");
  cookies.forEach(function(cookie){
  cookieJar.setCookie(cookie, cookiesURL);
  });
}

function sendRequest(endpoint, callback){
  var getOptions= {
    url: endpoint.url, 
    jar: cookieJar
  };

  request.get(getOptions, function(err,response,body){
    var jsonResponse = endpoint.parse(body);
    callback(jsonResponse);
  });
}

function setRequestEndpoint(endpoint){
  return function(req,res){

    setCookiesOnJar(res.locals.cookies);
    sendRequest(endpoint, function(jsonResponse){
      res.send(JSON.stringify(jsonResponse));
    });
  }
}

module.exports = setRequestEndpoint;