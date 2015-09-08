var cheerio = require('cheerio');

var grades = {
  url: ['http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Consultar+boleta'],
  parse: function(body){

    var i = 3; // first row of table to start 
    var j = 8; // first column with grades

    function Course(name) {
     this.name = name;
     this.grades = [];
    }
    
    var $ = cheerio.load(body);
    var rows = $('table.alumnos-tabla').children();
    var jsonResponse = {courses: []};

    for(; i < rows.length; i++){
      var name = rows.eq(i).children().first().text();
      var course = new Course(name);

      for(j = 8; j < 13; j++){
        var grade = rows.eq(i).children().eq(j).text();
        course.grades.push(grade);
      }
      jsonResponse.courses.push(course);
    }
    return jsonResponse;
  }
}

module.exports = grades; 