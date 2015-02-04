$(document).on('pageshow',"#consulta-corralones",function(event){
	$.getJSON('/json/corralones.json',function(corralonesJson){
		$('#ver-corralones-cercanos').click(function(){
			$('#lista-corralones').empty();
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas);
			} else {
				errorGeolocalizacion();
			}
			
			function exitoCoordenadas(location) {
				var corralonesCercanos = corralonesJson['corralones'];
				for (i = 0; i < corralonesCercanos.length; i++) {
					var corralon = corralonesCercanos[i];
					corralon['distancia'] = obtenerDistancia(location.coords.latitude, location.coords.longitude, corralon['latitud'], corralon['longitud']);
				}
				corralonesCercanos = corralonesCercanos.sort(compararDistancia).slice(0, NUM_MAX_RES);
				for (i = 0; i < corralonesCercanos.length; i++) {
					var corralon = corralonesCercanos[i];
					var divCorralon = '<div class="cuadro-info"> \
					<p class="titulo">'+corralon['nombre']+'</p> \
					<span class="titulo">Dirección: </span><span>'+corralon['direccion']+'</span></br> \
					<span class="titulo">Delegación: </span><span>'+corralon['delegacion']+'</span></br> \
					<span class="titulo">Teléfono: </span><a href="tel:'+corralon['telefono']+'">'+corralon['telefono']+'</a></br> \
					</div></br>';
					$('#lista-corralones').append(divCorralon);
				}
			}
		});
		
		$('#ver-corralones-todos').click(function(){
			var corralones = corralonesJson['corralones'];
			$('#lista-corralones').empty();
			for (i = 0; i < corralones.length; i++) {
				var corralon = corralones[i];
				var divCorralon = '<div class="cuadro-info"> \
				<p class="titulo">'+corralon['nombre']+'</p> \
				<span class="titulo">Dirección: </span><span>'+corralon['direccion']+'</span></br> \
				<span class="titulo">Delegación: </span><span>'+corralon['delegacion']+'</span></br> \
				<span class="titulo">Teléfono: </span><a href="tel:'+corralon['telefono']+'">'+corralon['telefono']+'</a></br> \
				</div></br>';
				$('#lista-corralones').append(divCorralon);
			}
		});
		
	});
    
	function errorCoordenadas() {
		console.log( 'Err0r! Obtener coordenadas geolocalización');
	}
	function errorGeolocalizacion() {
		console.log( 'Err0r! Error geolocalización');
	}
	
	function obtenerDistancia(lat1, lon1, lat2, lon2) {
		var R = 6371;
		var dLat = convertirRadianes(lat2-lat1);
		var dLon = convertirRadianes(lon2-lon1);
		lat1 = convertirRadianes(lat1);
		lat2 = convertirRadianes(lat2);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		return d
	}

	function convertirRadianes(numero) {
		return numero * Math.PI / 180;
	}
	
	function compararDistancia(a,b) {
		if (a.distancia < b.distancia)
			return -1;
		if (a.distancia > b.distancia)
			return 1;
		return 0;
	}
});
