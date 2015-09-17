var cheerio = require('cheerio');
/*****************************************************************************************
*                               General Information parser                               *
*****************************************************************************************/

var information = {
  url: ['http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Datos+generales',
  'http://micampus.mxl.cetys.mx/portal/auth/portal/default/Financiero/Pago+de+tr%C3%A1mites+escolares'],
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
    var nameContent = $('td.alumnos-encabezado-texto').eq(0).text();
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
