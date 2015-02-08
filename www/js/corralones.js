$(document).on('pageshow','#lista-corralones',function(event){
	if(typeof(Storage) !== 'undefined') {
		var corralones = JSON.parse(localStorage.corralones);
	}
	for (i = 0; i < corralones.length; i++){
		var corralon = corralones[i];
		var divCorralon = '<div class="cuadro-info"> \
		<h4>'+corralon['nombre']+'</h4> \
		<span class="titulo">Dirección: </span><span>'+corralon['direccion']+'</span></br> \
		<span class="titulo">Delegación: </span><span>'+corralon['delegacion']+'</span></br> \
		<span class="titulo">Teléfono: </span>'+corralon['telefono']+'</span></br> \
		<p><a href="tel:'+corralon['telefono']+'"><button data-role="button" data-icon="phone">Llamar</button></a></p> \
		<p><button data-role="button" data-icon="location">Ver en mapa</button></p> \
		<p><button data-role="button" data-icon="navigation">¿Cómo llegar?</button></p> \
		</div></br>';
		$('#corralones').append(divCorralon).trigger('create');
	}
});

$(document).on('pageshow','#menu-corralones',function(event){
	$('#ver-corralones-cercanos').click(function(){
		$.getJSON(PATH + 'json/corralones.json',function(corralonesJson){
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
				if(typeof(Storage) !== 'undefined') {
					localStorage.corralones = JSON.stringify(corralonesCercanos); 
				}
				$.mobile.changePage('corralones-listado.html');
			}
		});		
	});
	
	$('#ver-corralones-todos').click(function(){
		$.getJSON(PATH + 'json/corralones.json',function(corralonesJson){
			var corralones = corralonesJson['corralones'];
			if(typeof(Storage) !== 'undefined') {
				localStorage.corralones = JSON.stringify(corralones); 
			}
			$.mobile.changePage('corralones-listado.html');
		});
	});
		    
	function errorCoordenadas() {
		if(typeof(Storage) !== 'undefined') {
			localStorage.msjError = 'Err0r! Obtener coordenadas geolocalización'; 
			$.mobile.changePage('error.html');
		}
		console.log( );
	}
	function errorGeolocalizacion() {
		if(typeof(Storage) !== 'undefined') {
			localStorage.msjError = 'Err0r! Error geolocalización!'; 
			$.mobile.changePage('error.html');
		}
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
