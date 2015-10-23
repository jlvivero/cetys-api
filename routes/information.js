var cheerio = require('cheerio');
/*****************************************************************************************
*                               General Information parser                               *
*****************************************************************************************/

var information = {
  url: ['http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Datos+generales',
  'http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Plan+de+estudios'],
  parse: function(body){
    
    var $ = cheerio.load(body);
   // console.log($.html());
    
    /**************************************************************************************
    *                                       Email parser                                  *
    **************************************************************************************/
    var emailContent = $('div.portlet-content-center').children().children().eq(2).
    children().children().eq(9).children().eq(0).text();
  
    var splitEmail = emailContent.split(":");

    var jsonResponse = {};
    jsonResponse.email = splitEmail[1].trim();
    console.log(jsonResponse.email);

    /**************************************************************************************
    *                                       Name parser                                   *
    **************************************************************************************/
    var nameContent = $('div.portlet').children().eq(2).find('tr').children().eq(3).text().trim();
    var splitName = nameContent.split(",");
    var fullName = splitName[1] + " " + splitName[0]
    jsonResponse.name = fullName.trim();


    /**************************************************************************************
    *                                                                                     *
    *You can add the parsing of other data in here and add them to the jsonResponse object*
    *                                                                                     *
    **************************************************************************************/
    return jsonResponse;
  }

}

module.exports = information;
