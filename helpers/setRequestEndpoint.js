var request = require('request');
var cookieJar = null;


function setCookiesOnJar(cookiesString) {
  cookieJar = request.jar();
  var cookiesURL = "http://micampus.mxl.cetys.mx";
  var cookies = cookiesString.split(" ");
  cookies.forEach(function(cookie){
    cookieJar.setCookie(cookie, cookiesURL);
  });
}

function sendRequest(urls, parser, callBody, callback){
  if(urls.length === 0) {
  var jsonResponse = parser(callBody);
    callback(jsonResponse);
    return;
  }
  var getOptions= {
    url: urls.pop(), 
    jar: cookieJar
  }

  request.get(getOptions, function(err,response,body){
    sendRequest (urls, parser, body + callBody, callback);
  });
 }

function setRequestEndpoint(endpoint){
  return function(req,res){

    setCookiesOnJar(res.locals.cookies);
    var ulrs = endpoint.url.slice();
    var parser = endpoint.parse;
    sendRequest(ulrs, parser, "", function(jsonResponse){
      res.send(JSON.stringify(jsonResponse));
    });
  }
}

module.exports = setRequestEndpoint;
