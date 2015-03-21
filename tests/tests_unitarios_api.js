var transitoDf = require( '../lib/transitoDf.js');

module.exports = {
    setUp: function testsUnitariosApiSetup(callback) {
        this.vehiculo = transitoDf.consultaPlacas('183YTP');
    },
    obtenerPlacas: function(test) {
        assert.equal('183YTP', this.vehiculo.placas);
        test.done();
    },
    obtenerModelo: function(test) {
        assert.equal(2012, this.vehiculo.modelo);
        test.done();
    },
    obtenerNumeroCilindros: function(test) {
        assert.equal(4, this.vehiculo.numeroCilindros);
        test.done();
    },
    obtenerProcedenciaNacional: function(test) {
        assert.equal(true, this.vehiculo.esNacional);
        test.done();
    },
    obtenerValorFactura: function(test) {
        assert.equal(615288, this.vehiculo.valorFactura);
        test.done();
    },
    obtenerClaveVehicular: function(test) {
        assert.equal('0044801', this.vehiculo.claveVehicular);
        test.done();
    },
    obtenerMontoAdeudos: function(test) {
        assert.equal(0.00, this.vehiculo.montoAdeudos);
    },
    obtenerMontoInfracciones: function(test) {
        assert.equal(0.00, this.vehiculo.montoInfracciones);
    },
    obtenerFechaFactura: function(test) {
        assert.equal('2012-11-30', this.vehiculo.fechaFactura);
        test.done();
    },
    obtenerRfc: function(test) {
        assert.equal('Persona Moral', this.vehiculo.rfc);
        test.done();
    },
    obtenerDepreciacion: function(test) {
        assert.equal(369172.8, this.vehiculo.depreciacion);
        test.done();
    },
    validarPlacas: function(test) {
        test.throws(function () { transitoDf.consultaPlacas('183-YTP'); });
        test.done();
    },
    calcularHoyNoCircula: function(test) {
        var assertCalendario = {};
        assert.equal(assertCalendario, this.vehiculo.calendarioNoCircula);
        test.done();
    },
    buscarVehiculoNoExisteEnPadron: function(test) {
        test.throws(function () { transitoDf.consultaPlacas('154DBH'); });
        test.done();
    },
    obtenerMontoAdeudosInfracciones: function(test) {
        assert.equal(0.00, this.vehiculo.montoAdeudosInfracciones);
    },
    obtenerInfracciones: function(test) {
        var assertInfracciones = {};
        assert.equal(assertInfracciones, this.vehiculo.infracciones);
    },
    obtenerAdeudosTenencia: function(test) {
        var assertAdeudosTenencia = {};
        assert.equal(assertAdeudosTenencia, this.vehiculo.adeudosTenencia);
    },
    obtenerMontoAdeudosTenencia: function(test) {
        assert.equal(0.00, this.vehiculo.montoAdeudosTenencias);
    },
    obtenerListaVerificentros: function(test) {
        var assertVerificentros = {};
        assert.equal(assertVerificentros, transitoDf.verificentros());
    },
    obtenerlistaCorralones: function(test) {
        var assertCorralones = {};
        assert.equal(assertCorralones, transitoDf.corralones());
    },
    buscarVehiculoSinAdeudosNoExisteEnPadron: function(test) {
    }
};
