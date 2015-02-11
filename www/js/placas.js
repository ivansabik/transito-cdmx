$(document).on('pageshow','#consulta-placas',function(event){
	$.mobile.loading('show');
	if(typeof(Storage)!=='undefined') {
		if(localStorage.placas !=='undefined') {
			placas = localStorage.placas; 
		} else {
			alert( 'Err0r! Numero de placas undefined');
			return false;
		}
    }
    var mostrarResultados = function(consultaJson) {
		vehiculo = consultaJson['vehiculo']; 
		       
        var divInfoGeneral = '<div class="cuadro-info"> \
        <span class="titulo">Placas: </span><span>'+vehiculo['placas']+'</span></br> \
		<span class="titulo">Modelo: </span><span>'+vehiculo['modelo']+'</span></br> \
		<span class="titulo">Procedencia: </span><span>'+vehiculo['procedencia']+'</span></br> \
		<span class="titulo">Valor factura: </span><span class="cacao">'+vehiculo['valor_factura']+'</span></br> \
		<span class="titulo">Clave vehicular: </span><span>'+vehiculo['clave_vehicular']+'</span></br> \
		<span class="titulo">Fecha factura: </span><span>'+vehiculo['fecha_factura']+'</span></br> \
		<span class="titulo">RFC: </span><span>'+vehiculo['rfc']+'</span></br> \
		<span class="titulo">Monto depreciación: </span><span class="cacao">'+vehiculo['depreciacion']+'</span></br> \
		<span class="titulo">Total adeudos: </span><span class="cacao">'+vehiculo['total_adeudos']+'</span> \
		</div></br>';
		$('#info-general').html(divInfoGeneral);
		
        var adeudosTenencia = vehiculo['adeudos_tenencia']
        if(adeudosTenencia.length > 0) {
            for (i = 0; i < adeudosTenencia.length; i++) {
                var adeudo = adeudosTenencia[i];
                var divAdeudo = '<div class="cuadro-info"> \
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
        } else {
			$('#adeudos-tenencia').html('<p>Sin adeudos de tenencia</p>');
		}
        
        var infraciones = vehiculo['infracciones']
        if(infraciones.length > 0) {
            for (i = 0; i < infraciones.length; i++) {
                var infraccion = infraciones[i];
                var textoPagada = 'No';
                if(infraccion['pagada'] == true) {
                    textoPagada = 'Sí';
                }
                var divInfraccion = '<div class="cuadro-info"> \
                <span class="titulo">Folio: </span><span>'+infraccion['folio']+'</span></br> \
				<span class="titulo">Fecha: </span><span>'+infraccion['fecha']+'</span></br> \
				<span class="titulo">Pagada: </span><span>'+textoPagada+'</span></br> \
				<span class="titulo">Motivo: </span><span>'+infraccion['motivo']+'</span></br> \
                <span class="titulo">Multa en días de salario: </span><span>'+infraccion['sancion']['dias_sm']+'</span></br> \
				<span class="titulo">Multa estimada: </span><span class="cacao">'+infraccion['sancion']['monto']+'</span></br> \
                </div></br>';
                $('#infracciones').append(divInfraccion);
            }
        } else {
			$('#infracciones').html('<p>Sin infracciones</p>');
		}
        $('.cacao').autoNumeric('init', {aSign: '$ '});
        $('#consulta').css('visibility','visible');
        $.mobile.loading('hide');
    };
    var mostrarError = function(req, status, err) {		
		alert('Err0r!');
		parent.history.back();
		return false;
    };
    var ajaxOptions = {
        url: URL_API + '/vehiculos/' + placas,
        dataType: 'json',
        success: mostrarResultados,
        error: mostrarError
    };
    $.ajax(ajaxOptions);
});
