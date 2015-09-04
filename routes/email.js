var cheerio = require('cheerio');

var mail = {
  url: 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Datos+generales',
  parse: function(body){

    var i = 3; // first row of table to start 
    var j = 8; // first column with grades

    function Email(email){
      this.email = email;
    }

    
    var $ = cheerio.load(body);
    var emailContent = $('div.portlet-content-center').children().eq(2).children().children().eq(5).children().eq(0).children().text()
    var splitEmail = emailContent.split(":");
    var actualEmail.Email(splitEmail[1]);
    actualEmail.trim();
    jsonResponse.push(actualEmail);
    return jsonResponse;
  }

}

module.exports = grades; 