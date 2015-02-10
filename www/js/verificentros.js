$(document).on('pageshow','#lista-verificentros',function(event){
	if(typeof(Storage) !== 'undefined') {
		var verificentros = JSON.parse(localStorage.verificentros);
	}
	for (i = 0; i < verificentros.length; i++){
		var verificentro = verificentros[i];
		var divVerificentro = '<div class="cuadro-info"> \
		<h4>'+verificentro['razon_social']+'</h4> \
		<span class="titulo">Dirección: </span><span>'+verificentro['direccion']+'</span></br> \
		<span class="titulo">Delegación: </span><span>'+verificentro['delegacion']+'</span></br> \
		<span class="titulo">Teléfono: </span>'+verificentro['telefono']+'</span></br> \
		<p><a href="tel:'+verificentro['telefono']+'"><button data-role="button" data-icon="phone">Llamar</button></a></p> \
		<p><a href="#" onclick="window.open(\''+URL_GMAPS_MAPA+verificentro['latitud']+','+verificentro['longitud']+'\', \'_system\');"><button data-role="button" data-icon="location">Ver en mapa</button></a></p> \
		<p><a href="#" onclick="window.open(\''+URL_GMAPS_DIR+verificentro['latitud']+','+verificentro['longitud']+'\', \'_system\');"><button data-role="button" data-icon="navigation">¿Cómo llegar?</button></p> \
		</div></br>';
		$('#verificentros').append(divVerificentro).trigger('create');
	}
	$.mobile.loading('hide');
});

$(document).on('pageshow','#menu-verificentros',function(event){
	$('#ver-verificentros-cercanos').click(function(){
		$.mobile.loading('show');
		$.getJSON(PATH + 'json/verificentros.json',function(verificentrosJson){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(exitoCoordenadas, coordenadasNativo, { enableHighAccuracy: false, timeout: 60*1000, maximumAge: 1000*60*10 });
			} else {
				errorGeolocalizacion();
			}
			
			function coordenadasNativo() {
				navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas, { enableHighAccuracy: true, timeout: 60*1000*2, maximumAge: 1000*60*10 });
			}

			function exitoCoordenadas(location) {
				var verificentrosCercanos = verificentrosJson['verificentros'];
				for (i = 0; i < verificentrosCercanos.length; i++) {
					var verificentro = verificentrosCercanos[i];
					verificentro['distancia'] = obtenerDistancia(location.coords.latitude, location.coords.longitude, verificentro['latitud'], verificentro['longitud']);
				}
				verificentrosCercanos = verificentrosCercanos.sort(compararDistancia).slice(0, NUM_MAX_RES);
				if(typeof(Storage) !== 'undefined') {
					localStorage.verificentros = JSON.stringify(verificentrosCercanos); 
					$.mobile.changePage('verificentros-listado.html');
				}
			}
		});		
	});
	
	$('#ver-verificentros-todos').click(function(){
		$.getJSON(PATH + 'json/verificentros.json',function(verificentrosJson){
			var verificentros = verificentrosJson['verificentros'];
			if(typeof(Storage) !== 'undefined') {
				localStorage.verificentros = JSON.stringify(verificentros);
				$.mobile.changePage('verificentros-listado.html');
			}
		});
	});
		    
	function errorCoordenadas() {
		if(typeof(Storage) !== 'undefined') {
			localStorage.msjError = 'Err0r! Obtener coordenadas geolocalización'; 
			$.mobile.changePage('error.html');
		}
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
