module.exports = {
    setUp: function testsUnitariosApiSetup(cb) {
        this.tdf = new TransitoDf();
        this.respuesta = this.tdf.consultaPlacas('183YTP');
    },
    tearDown: function testsUnitariosApiTearDown(cb) {
    },
    obtenerPlacas: function(test) {
        assert.equal('183YTP', this.respuesta['placas']);
        test.done();
    },
    obtenerModelo: function(test) {
        assert.equal(2012, this.respuesta['modelo']);
        test.done();
    },
    obtenerNumeroCilindros: function(test) {
        assert.equal(4, this.respuesta['num_cilindros']);
        test.done();
    },
    obtenerProcedenciaNacional: function(test) {
        assert.equal(true, this.respuesta['procedencia_nacional']);
        test.done();
    },
    obtenerValorFactura: function(test) {
        assert.equal(615288, this.respuesta['valor_factura']);
        test.done();
    },
    obtenerClaveVehicular: function(test) {
        assert.equal('0044801', this.respuesta['clave_vehicular']);
        test.done();
    },
    obtenerMontoAdeudos: function(test) {
        assert.equal('', this.respuesta['monto_adeudos']);
    },
    obtenerMontoInfracciones: function(test) {
        assert.equal('', this.respuesta['monto_infracciones']);
    },
    obtenerFechaFactura: function(test) {
        assert.equal('2012-11-30', this.respuesta['fecha_factura']);
        test.done();
    },
    obtenerRfc: function(test) {
        assert.equal('Persona Moral', this.respuesta['rfc']);
        test.done();
    },
    obtenerDepreciacion: function(test) {
        assert.equal(369172.8, this.respuesta['depreciacion']);
        test.done();
    },
    validarPlacas: function(test) {
        test.throws(function () { this.tdf.consultaPlacas('183-YTP'); });
        test.done();
    },
    calcularHoyNoCircula: function(test) {
        var assertCalendario = {};
        assert.equal(assertCalendario, this.respuesta['calendarioNoCircula']);
        test.done();
    },
    buscarVehiculoNoExisteEnPadron: function(test) {
        test.throws(function () { this.tdf.consultaPlacas('154DBH'); });
        test.done();
    },
    obtenerMontoAdeudosInfracciones: function(test) {
        assert.equal('', this.respuesta['monto_adeudos_infracciones']);
    },
    obtenerInfracciones: function(test) {
        assert.equal('', this.respuesta['infracciones']);
        test.done();
    },
    obtenerAdeudosTenencia: function(test) {
        assert.equal('', this.respuesta['adeudos_tenencia']);
        test.done();
    },
    obtenerMontoAdeudosTenencia: function(test) {
        assert.equal('', this.respuesta['monto_adeudos_tenencias']);
        test.done();
    },
    obtenerListaVerificentros: function(test) {
        var assertVerificentros = {};
        assert.equal('', this.tdf.verificentros());
    },
    obtenerlistaCorralones: function(test) {
        var assertCorralones = {};
        assert.equal('', this.tdf.corralones());
    }
};
