var xray = require('x-ray');

var placa = '183YTP';
var url = 'http://www.finanzas.df.gob.mx/sma/detallePlaca.php?placa=' + placa;

var patterns = {
  folio: /[0-9]{11}/,
  fecha: /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
  situacion: /.*agada/i,
  motivo: /POR.*/,
  fundamento: /Art.*/i,
  sancion: /.*as de salario m.*/i
};

// TODO: lib, funcion, objeto propio que use x ray y haga lo mismo?
xray(url)
  .select([{
      $root: '#tablaDatos',
      arregloTds: ['td']
  }])
  .run(function(error, scraped) {
    var infracciones = [];
    scraped.forEach(function(tds) {
      var infraccion = {};
      tds.arregloTds.forEach(function(td) {
        patterns.folio.test(td) ? infraccion.folio = td : null;
        patterns.fecha.test(td) ? infraccion.fecha = td : null;
        patterns.situacion.test(td) ? infraccion.situacion = td : null;
        patterns.motivo.test(td) ? infraccion.motivo = td : null;
        patterns.fundamento.test(td) ? infraccion.fundamento = td : null;
        patterns.sancion.test(td) ? infraccion.sancion = td : null;
      })
      infraccion ? infracciones.push(infraccion): null;
    })
    console.log(infracciones);
  });
