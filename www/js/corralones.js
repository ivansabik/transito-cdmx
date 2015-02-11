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
		<p><a href="#" onclick="window.open(\''+URL_GMAPS_MAPA+corralon['latitud']+','+corralon['longitud']+'\', \'_system\');"><button data-role="button" data-icon="location">Ver en mapa</button></a></p> \
		<p><a href="#" onclick="window.open(\''+URL_GMAPS_DIR+corralon['latitud']+','+corralon['longitud']+'\', \'_system\');"><button data-role="button" data-icon="navigation">¿Cómo llegar?</button></p> \
		</div></br>';
		$('#corralones').append(divCorralon).trigger('create');
	}
	$.mobile.loading('hide');
});

$(document).on('pageshow','#menu-corralones',function(event){
	$('#ver-corralones-cercanos').click(function(){
		$.mobile.loading('show');
		$.getJSON(PATH + 'json/corralones.json',function(corralonesJson){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(exitoCoordenadas, coordenadasNativo, { enableHighAccuracy: false, timeout: 60*1000, maximumAge: 1000*60*10 });
			} else {
				errorGeolocalizacion();
			}
			
			function coordenadasNativo() {
				navigator.geolocation.getCurrentPosition(exitoCoordenadas, errorCoordenadas, { enableHighAccuracy: true, timeout: 60*1000*2, maximumAge: 1000*60*10 });
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
					$.mobile.changePage('corralones-listado.html');
				}
			}
		});	zz	
	});
	
	$('#ver-corralones-todos').click(function(){
		$.mobile.loading('show');
		$.getJSON(PATH + 'json/corralones.json',function(corralonesJson){
			var corralones = corralonesJson['corralones'];
			if(typeof(Storage) !== 'undefined') {
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
