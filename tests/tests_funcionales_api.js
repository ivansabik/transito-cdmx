module.exports = {
    setUp: function testsUnitariosApiSetup(cb) {
        this.tdf = new TransitoDf();
        this.respuesta = this.tdf.consultaPlacas('183YTP');
    },
    consultaCorralones: function(test) {
    },
    consultaVehiculos: function(test) {
    },
    consultaVerificentros: function(test) {
    },
};
