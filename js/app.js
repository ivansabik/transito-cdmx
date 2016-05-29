// Constantes globales
URL_API = 'http://46.101.228.138:3000/api/v1';

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
    $('#consulta').toggle();
    $.mobile.loading('show');
    var placas = simpleStorage.get('placas');
    if (!placas) {
        alert('Err0r! Numero de placas undefined');
    }
    var mostrarResultados = function (consultaJson) {
        $('#consulta').toggle();
        if(consultaJson.error) {
            alert(consultaJson.error);
            $.mobile.loading('hide');
            parent.history.back();
            return false;
        }
        var vehiculo = new Vehiculo(consultaJson);
        $('#info-general').html(vehiculo.toHtml());
        var adeudosTenencia = vehiculo.adeudosTenencia;
        if (adeudosTenencia.length > 0) {
            $('#adeudos-tenencia').html('');
            for (var i = 0; i < adeudosTenencia.length; i++) {
                var adeudo = adeudosTenencia[i];
                $('#adeudos-tenencia').append(adeudo.toHtml());
            }
        } else {
            $('#adeudos-tenencia').html('<p>Sin adeudos de tenencia</p>');
        }
        var infraciones = vehiculo.infracciones;
        if (infraciones.length > 0) {
            $('#infracciones').html('');
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
        $.support.cors = true;
        $.ajax(ajaxOptions);
    }
});
