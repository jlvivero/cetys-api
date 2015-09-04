var request = require('request');
var cookieJar = request.jar();


function setCookiesOnJar(cookiesString) {
  var cookiesURL = "http://micampus.mxl.cetys.mx";
  var cookies = cookiesString.split(" ");
  cookies.forEach(function(cookie){
  cookieJar.setCookie(cookie, cookiesURL);
  });
}

function sendRequest(endpoint, callBody, callback){
  if(endpoint.url.length === 0) {
  var jsonResponse = endpoint.parse(callBody);
    callback(jsonResponse);
    return;
  }
  
  var getOptions= {
    url: endpoint.url.pop(), 
    jar: cookieJar
  }

  request.get(getOptions, function(err,response,body){
    sendRequest (endpoint, body + callBody, callback);
  });
 }

function setRequestEndpoint(endpoint){
  return function(req,res){

    setCookiesOnJar(res.locals.cookies);
    sendRequest(endpoint, "", function(jsonResponse){
      res.send(JSON.stringify(jsonResponse));
    });
  }
}

module.exports = setRequestEndpoint;