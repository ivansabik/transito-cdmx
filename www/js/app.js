// Constantes globales
URL_API = 'http://localhost:5000/api/index.php/transitodf';
NUM_MAX_RES = 5;
PATH = window.location.href.replace('index.html', '');
URL_GMAPS_MAPA = 'http://maps.google.com/maps?q=';
URL_GMAPS_DIR = 'http://maps.google.com/maps?saddr=Current+Location&daddr=';
URL_GMAPS_CORRALONES = 'http://goo.gl/K3YW7R';
URL_GMAPS_VERIFICENTROS = 'http://goo.gl/4x9EtG';
MAX_RADIO_CERCANAS = 5000;

// Home
$(document).on('pageshow', '#index', function () {
    var placas = simpleStorage.get('placas');
    if (placas) {
        $('#input-placas').val(placas);
    }

    $('#consultar-placas').click(function (event) {
        var placas = $('#input-placas').val().toUpperCase();
        if (!Vehiculo.validaPlacas(placas)) {
            alert('Placas inválidas');
            event.stopPropagation();
        } else {
            simpleStorage.set('placas', placas);
            $.mobile.changePage('#consulta-placas');
        }
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            $('#consultar-placas').trigger('click');
        }
    });
});

// Consultar placas
$(document).on('pageshow', '#consulta-placas', function () {
    $.mobile.loading('show');
    var placas = simpleStorage.get('placas');
    if (!placas) {
        alert('Err0r! Numero de placas undefined');
    }
    var mostrarResultados = function (consultaJson) {
        var vehiculo = new Vehiculo(consultaJson);
        $('#info-general').html(vehiculo.toHtml());
        var adeudosTenencia = vehiculo.adeudosTenencia;
        if (adeudosTenencia.length > 0) {
            for (var i = 0; i < adeudosTenencia.length; i++) {
                var adeudo = adeudosTenencia[i];
                $('#adeudos-tenencia').append(adeudo.toHtml());
            }
        } else {
            $('#adeudos-tenencia').html('<p>Sin adeudos de tenencia</p>');
        }
        var infraciones = vehiculo.infracciones;
        if (infraciones.length > 0) {
            for (var i = 0; i < infraciones.length; i++) {
                var infraccion = infraciones[i];
                $('#infracciones').append(infraccion.toHtml());
            }
        } else {
            $('#infracciones').html('<p>Sin infracciones</p>');
        }
        $('.cacao').autoNumeric('init', {aSign: '$ '});
        $.mobile.loading('hide');
    };
    var mostrarError = function (req, status, err) {
        alert('Err0r!' + err);
        parent.history.back();
        return false;
    };
    var ajaxOptions = {
        url: URL_API + '/vehiculos/' + placas,
        dataType: 'json',
        success: mostrarResultados,
        error: mostrarError
    };
    if (Vehiculo.existeLocal(placas)) {
        alert('Existen localmente no hay que hacer apicall!');
    } else {
        $.ajax(ajaxOptions);
    }
});

$(document).on('pageshow', '#menu-corralones', function () {
    // Ver todos los corralones
    // Ver corralones cercanos
    $('#ver-corralones-cercanos').click(function () {
        obtenerUbicacion();
    });
    // Ver corralones en mapa
});

$(document).on('pageshow', '#menu-verificentros', function () {
    // Ver todos los verificentros
    // Ver verificentros cercanos
    $('#ver-corralones-cercanos').click(function () {
        obtenerUbicacion();
    });
    // Ver verificentros en mapa
});

function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(exitoCoordenadas, coordenadasNativo, {enableHighAccuracy: false, timeout: 60 * 1000, maximumAge: 1000 * 60 * 10});
    } else {
        errorGeolocalizacion();
    }

    function coordenadasNativo() {
        navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas, {enableHighAccuracy: true, timeout: 60 * 1000 * 2, maximumAge: 1000 * 60 * 10});
    }

    function exitoCoordenadas(location) {
        var latitud = location.coords.latitude;
        var longitud = location.coords.longitude;
        // set ubicacion en local storage
        alert(latitud + ',' + longitud);
    }

    function errorCoordenadas() {
        alert('Err0r! Obtener coordenadas geolocalización');
    }

    function errorGeolocalizacion() {
        alert('Err0r! Error geolocalización!');
    }
}
