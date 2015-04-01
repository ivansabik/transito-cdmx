var assert = require('assert');
var transitoDf = require('../lib/transitoDf.js');
var fixtures = require('./fixtures');
var assertCorralones = []
var assertVerificentros = []
var assertVehiculo = {}

describe('Scraping info pública', function(){
    beforeEach(function () {
      this.vehiculo = transitoDf.consultaPlacas('183YTP');
    });
    
    it('obtener placas', function(){
      assert.equal(fixtures.vehiculo.placas, this.vehiculo.placas);
    });
    
    it('obtener modelo', function(){
      assert.equal(fixtures.vehiculo.modelo, this.vehiculo.modelo);
    });
    
    it('obtener numero de cilindros', function(){
      assert.equal(fixtures.numero_cilindros, this.vehiculo.numeroCilindros);
    });
    it('obtener si el vehiculo es nacional', function() {
      assert.equal(fixtures.vehiculo.es_nacional, this.vehiculo.esNacional);
    });
    
    it('obtener el valor factura', function() {
      assert.equal(fixtures.vehiculo.valor_factura, this.vehiculo.valorFactura);
    });
    it('obtener la clave vehicular', function() {
      assert.equal(fixtures.vehiculo.clave_vehicular, this.vehiculo.claveVehicular);
    });
    it('obtener el monto de adeudos', function() {
      assert.equal(fixtures.vehiculo.monto_adeudos, this.vehiculo.montoAdeudos);
    });
    it('obtener el monto de infracciones', function() {
      assert.equal(fixtures.vehiculo.monto_infracciones, this.vehiculo.montoInfracciones);
    });
    it('obtener la fecha factura', function() {
      assert.equal(fixtures.vehiculo.fecha_factura, this.vehiculo.fechaFactura);
    });
    it('obtener el RFC', function() {
      assert.equal(fixtures.vehiculo.rfc, this.vehiculo.rfc);
    });
    it('obtener el monto de depreciacion', function() {
      assert.equal(fixtures.vehiculo.depreciacion, this.vehiculo.depreciacion);
    });
    it('error si el formato de placas es incorrecto', function() {
      assert.throw(transitoDf.consultaPlacas('183-YTP'), Error, '');
    });
    it('calcular calendario de hoy no circula', function() {
      assert.equal(fixtures.calendario, this.vehiculo.calendarioNoCircula);
    });
    it('error si el vehiculo no existe en el padron vehicular', function() {        
      assert.throw(transitoDf.consultaPlacas('154DBH'), Error, '');
    });
    it('obtener monto de adeudos por infracciones', function() {
      assert.equal(fixtures.vehiculo.monto_adeudos_infracciones, this.vehiculo.montoAdeudosInfracciones);
    });
    it('obtener infracciones', function() {
      assert.deepEqual(fixtures.vehiculo.infracciones, this.vehiculo.infracciones);
    });
    it('obtener adeudos de tenencia', function() {
        assert.deepEqual(fixtures.vehiculo.adeudos_tenencia, this.vehiculo.adeudosTenencia);
    });
    it('obtener monto de adeudos por tenencia', function() {
        assert.equal(fixtures.vehiculo.monto_adeudos_tenencia, this.vehiculo.montoAdeudosTenencias);
    });
    it('obtener lista de verificentros', function() {
        assert.deepEqual(fixtures.verificentros, transitoDf.verificentros());
    });
    it('obtener lista de corralones', function() {
        assert.deepEqual(fixtures.corralones, transitoDf.corralones());
    });
});
