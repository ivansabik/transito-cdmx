module.exports = {
    setUp: function testsUnitariosApiSetup(cb) {
        this.tdf = new TransitoDf();
        this.respuesta = this.tdf.consultaPlacas('183YTP');
    },
    tearDown: function testsUnitariosApiTearDown(cb) {
    },
    obtenerPlacas: function(test) {
        assert.equal('183YTP', this.respuesta['placas']);
    },
    obtenerModelo: function(test) {
        assert.equal(2012, this.respuesta['modelo']);
    },
    obtenerNumeroCilindros: function(test) {
        assert.equal(4, this.respuesta['numCilindros']);
    },
    obtenerProcedenciaNacional: function(test) {
        assert.equal(true, this.respuesta['esNacional']);
    },
    obtenerValorFactura: function(test) {
        assert.equal(615288, this.respuesta['valorFactura']);
    },
    obtenerClaveVehicular: function(test) {
        assert.equal('0044801', this.respuesta['claveVehicular']);
    },
    obtenerMontoAdeudosInfracciones: function(test) {
        assert.equal('', this.respuesta['montoAdeudosInfracciones']);
    },
    obtenerMontoTotalAdeudos: function(test) {
        assert.equal('', this.respuesta['montoTotalAdeudos']);
    },
    obtenerMontoTotalInfracciones: function(test) {
        assert.equal('', this.respuesta['montoTotalInfracciones']);
    },
    obtenerFechaFactura: function(test) {
        assert.equal('2012-11-30', this.respuesta['fechaFactura']);
    },
    obtenerRfc: function(test) {
        assert.equal('Persona Moral', this.respuesta['rfc']);
    },
    obtenerDepreciacion: function(test) {
        assert.equal(369172.8, this.respuesta['depreciacion']);
    },
    obtenerInfracciones: function(test) {
        assert.equal('', this.respuesta['infracciones']);
    },
    obtenerAdeudosTenencia: function(test) {
        assert.equal('', this.respuesta['adeudosTenencia']);
    },
    obtenerMontoTotalAdeudosTenencia: function(test) {
        assert.equal('', this.respuesta.montoAdeudosTenencias);
    },
    validarPlacas: function(test) {
        test.throws(function () { this.tdf.consultaPlacas('183-YTP'); });
    },
    calcularHoyNoCircula: function(test) {
        var assertCalendario = {};
        assert.equal(assertCalendario, this.respuesta['calendarioNoCircula']);
    },
    buscarVehiculoNoExisteEnPadron: function(test) {
        test.throws(function () { this.tdf.consultaPlacas(''); });
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
