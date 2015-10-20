var cheerio = require('cheerio');

var history = {
  url: ['http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Historial+academico'],
  parse: function(body) {
    var $ = cheerio.load(body);
    var response = {approved: [], enrolled: []};

    $('table.yaAprobada').each(function(index, element) {
      var name = $(element).find('tr').eq(0).find('td').eq(1).find('strong > font').eq(0).text().trim();
      var grade = $(element).find('tr').eq(1).find('td').eq(4).find('strong > font').eq(0).text();
      response.approved.push({name: name, grade: grade});
    });

    $('table.estaCursando').each(function(index, element) {
      var name = $(element).find('tr').eq(0).find('td').eq(1).find('strong > font').eq(0).text().trim();
      var grade = $(element).find('tr').eq(1).find('td').eq(4).find('strong > font').eq(0).text();
      response.enrolled.push({name: name});
    });

    return response;
  }
}

module.exports = history;
