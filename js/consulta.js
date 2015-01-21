$(document).ready(function(){
    placas = document.URL.split('#')[1].toUpperCase();
    var mostrarResultados = function(consultaJson) {
        $('#placas').html(placas);
        vehiculo = consultaJson['vehiculo'];
        $('#modelo').html(vehiculo['modelo']);
        $('#numero-cilindros').html(vehiculo['']);
        if(vehiculo['procedencia_nacional'] == true) {
            $('#procedencia').html('Nacional');
        } else {
            $('#procedencia').html('Extranjera');
        }
        $('#valor-factura').html(vehiculo['valor_factura']);
        $('#clave-vehicular').html(vehiculo['clave_vehicular']);
        $('#fecha-factura').html(vehiculo['fecha_factura']);
        $('#rfc').html(vehiculo['rfc']);
        $('#depreciacion').html(vehiculo['depreciacion']);
        $('#total-adeudos').html(vehiculo['total_adeudos']);
        $('#info-consulta').css('visibility','visible');
        $("#cargando").hide();
        var adeudosTenencia = vehiculo['adeudos_tenencia']
        if(adeudosTenencia.length > 0) {
            for (i = 0; i < adeudosTenencia.length; i++) {
                var adeudo = adeudosTenencia[i];
                var divAdeudo = '<div class="bg-info cuadro-info"> \
                <span class="titulo">Año: </span> \
                <span>'+adeudo['anio']+'</span></br> \
                <span class="titulo">Impuesto: </span> \
                <span class="cacao">'+adeudo['total_impuesto']+'</span></br> \
                <span class="titulo">Derechos: </span> \
                <span class="cacao">'+adeudo['total_derecho']+'</span></br> \
                <span class="titulo">Actualización: </span> \
                <span class="cacao">'+adeudo['total_actualizacion']+'</span></br> \
                <span class="titulo">Recargos: </span> \
                <span class="cacao">'+adeudo['total_recargo']+'</span></br> \
                <span class="titulo">Total: </span> \
                <span class="cacao">'+adeudo['total_tenencia']+'</span></br> \
                </div></br>';
                $('#adeudos-tenencia').append(divAdeudo);
            }
        }
        var infraciones = vehiculo['infracciones']
        if(infraciones.length > 0) {
            for (i = 0; i < infraciones.length; i++) {
                var infraccion = infraciones[i];
                var textoPagada = 'No';
                if(infraccion['pagada'] == true) {
                    textoPagada = 'Sí';
                }
                var divInfraccion = '<div class="bg-info cuadro-info"> \
                <span class="titulo">Folio: </span><span>'+infraccion['folio']+'</span></br> \
				<span class="titulo">Fecha: </span><span>'+infraccion['fecha']+'</span></br> \
				<span class="titulo">Pagada: </span><span>'+textoPagada+'</span></br> \
				<span class="titulo">Motivo: </span><span>'+infraccion['motivo']+'</span></br> \
                <span class="titulo">Multa en días de salario: </span><span>'+infraccion['sancion']['dias_sm']+'</span></br> \
				<span class="titulo">Multa estimada: </span><span class="cacao">'+infraccion['sancion']['monto']+'</span></br> \
                </div></br>';
                $('#infracciones').append(divInfraccion);
            }
        }
        $('.cacao').autoNumeric('init', {aSign: '$ '});
        //console.log(consultaJson);
    };
    var mostrarError = function( req, status, err ) {
        console.log( 'Err0r!', status, err );
    };
    var ajaxOptions = {
        url: '/transitodf/vehiculos/'+placas,
        dataType: 'json',
        success: mostrarResultados,
        error: mostrarError
    };
    $.ajax(ajaxOptions);
});
