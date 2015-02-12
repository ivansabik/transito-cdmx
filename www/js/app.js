// Constantes globales
URL_API = 'http://localhost:5000/api/index.php/transitodf';
NUM_MAX_RES = 5;
PATH = window.location.href.replace('index.html', '');
URL_GMAPS_MAPA = 'http://maps.google.com/maps?q=';
URL_GMAPS_DIR = 'http://maps.google.com/maps?saddr=Current+Location&daddr=';
URL_GMAPS_CORRALONES = 'https://www.google.com/maps/d/edit?mid=zQg_E1qdziCA.kLI2wjNXFpnc';
URL_GMAPS_VERIFICENTROS = 'https://www.google.com/maps/d/edit?mid=zQg_E1qdziCA.kilFkwYKHw9s';
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
        alert('Existen localmente no hay que hacer apicall!')
    } else {
        $.ajax(ajaxOptions);
    }
});
// Ver corralones cercanos
$(document).on('pageshow', '#lista-corralones', function () {
    var corralones = JSON.parse(localStorage.corralones);
    for (i = 0; i < corralones.length; i++) {
        var corralon = corralones[i];
        $('#corralones').append(divCorralon).trigger('create');
    }
    $.mobile.loading('hide');
});
$(document).on('pageshow', '#menu-corralones', function () {
    $('#ver-corralones-cercanos').click(function () {
        $.mobile.loading('show');
        $.getJSON(PATH + 'json/corralones.json', function (corralonesJson) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(exitoCoordenadas, coordenadasNativo, {enableHighAccuracy: false, timeout: 60 * 1000, maximumAge: 1000 * 60 * 10});
            } else {
                errorGeolocalizacion();
            }

            function coordenadasNativo() {
                navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas, {enableHighAccuracy: true, timeout: 60 * 1000 * 2, maximumAge: 1000 * 60 * 10});
            }

            function exitoCoordenadas(location) {
                var corralonesCercanos = corralonesJson['corralones'];
                for (i = 0; i < corralonesCercanos.length; i++) {
                    var corralon = corralonesCercanos[i];
                    corralon['distancia'] = obtenerDistancia(location.coords.latitude, location.coords.longitude, corralon['latitud'], corralon['longitud']);
                }
                corralonesCercanos = corralonesCercanos.sort(compararDistancia).slice(0, NUM_MAX_RES);
                if (typeof (Storage) !== 'undefined') {
                    localStorage.corralones = JSON.stringify(corralonesCercanos);
                    $.mobile.changePage('corralones-listado.html');
                }
            }
        });
    });
    $('#ver-corralones-todos').click(function () {
        $.mobile.loading('show');
        $.getJSON(PATH + 'json/corralones.json', function (corralonesJson) {
            var corralones = corralonesJson['corralones'];
            if (typeof (Storage) !== 'undefined') {
                localStorage.corralones = JSON.stringify(corralones);
                $.mobile.changePage('corralones-listado.html');
            }
        });
    });
    function errorCoordenadas() {
        $.mobile.loading('hide');
        alert('Err0r! Obtener coordenadas geolocalización');
        return false;
    }

    function errorGeolocalizacion() {
        $.mobile.loading('hide');
        alert('Err0r! Error geolocalización!');
        return false;
    }

    function obtenerDistancia(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = convertirRadianes(lat2 - lat1);
        var dLon = convertirRadianes(lon2 - lon1);
        lat1 = convertirRadianes(lat1);
        lat2 = convertirRadianes(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    function convertirRadianes(numero) {
        return numero * Math.PI / 180;
    }

    function compararDistancia(a, b) {
        if (a.distancia < b.distancia)
            return -1;
        if (a.distancia > b.distancia)
            return 1;
        return 0;
    }
});
// Ver todos los corralones

// Ver corralones en mapa

// Ver verificentros cercanos
$(document).on('pageshow', '#lista-verificentros', function (event) {
    if (typeof (Storage) !== 'undefined') {
        var verificentros = JSON.parse(localStorage.verificentros);
    }
    for (i = 0; i < verificentros.length; i++) {
        var verificentro = verificentros[i];

        $('#verificentros').append(divVerificentro).trigger('create');
    }
    $.mobile.loading('hide');
});
$(document).on('pageshow', '#menu-verificentros', function (event) {
    $('#ver-verificentros-cercanos').click(function () {
        $.mobile.loading('show');
        $.getJSON(PATH + 'json/verificentros.json', function (verificentrosJson) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(exitoCoordenadas, coordenadasNativo, {enableHighAccuracy: false, timeout: 60 * 1000, maximumAge: 1000 * 60 * 10});
            } else {
                errorGeolocalizacion();
            }

            function coordenadasNativo() {
                navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas, {enableHighAccuracy: true, timeout: 60 * 1000 * 2, maximumAge: 1000 * 60 * 10});
            }

            function exitoCoordenadas(location) {
                var verificentrosCercanos = verificentrosJson['verificentros'];
                for (i = 0; i < verificentrosCercanos.length; i++) {
                    var verificentro = verificentrosCercanos[i];
                    verificentro['distancia'] = obtenerDistancia(location.coords.latitude, location.coords.longitude, verificentro['latitud'], verificentro['longitud']);
                }
                verificentrosCercanos = verificentrosCercanos.sort(compararDistancia).slice(0, NUM_MAX_RES);
                if (typeof (Storage) !== 'undefined') {
                    localStorage.verificentros = JSON.stringify(verificentrosCercanos);
                    $.mobile.changePage('verificentros-listado.html');
                }
            }
        });
    });
    $('#ver-verificentros-todos').click(function () {
        $.getJSON(PATH + 'json/verificentros.json', function (verificentrosJson) {
            var verificentros = verificentrosJson['verificentros'];
            if (typeof (Storage) !== 'undefined') {
                localStorage.verificentros = JSON.stringify(verificentros);
                $.mobile.changePage('verificentros-listado.html');
            }
        });
    });
    function errorCoordenadas() {
        $.mobile.loading('hide');
        alert('Err0r! Obtener coordenadas geolocalización');
        return false;
    }

    function errorGeolocalizacion() {
        $.mobile.loading('hide');
        alert('Err0r! Error geolocalización!');
        return false;
    }

    function obtenerDistancia(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = convertirRadianes(lat2 - lat1);
        var dLon = convertirRadianes(lon2 - lon1);
        lat1 = convertirRadianes(lat1);
        lat2 = convertirRadianes(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d
    }

    function convertirRadianes(numero) {
        return numero * Math.PI / 180;
    }

    function compararDistancia(a, b) {
        if (a.distancia < b.distancia)
            return -1;
        if (a.distancia > b.distancia)
            return 1;
        return 0;
    }
});
// Ver todos los verificentros

// Ver verificentros en mapa
