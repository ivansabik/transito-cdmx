$(document).on('pageshow','#index',function(event){
	if(typeof(Storage) !== 'undefined') {
		if(localStorage.placas !=='undefined') {
			placas = localStorage.placas; 
			$('#input-placas').val(placas);
		}
	}
    
    $('#consultar-placas').click(function(){
        var placas = $('#input-placas').val().toUpperCase();
        
        if(placas.length != 6){
			if(navigator.notification == undefined) {
				alert('Placas inválidas');
			} else {
				navigator.notification.alert('Placas inválidas',function(){},'Oh ooooh','Ok');
			}
			return false;
		}
        
        if(typeof(Storage)!=='undefined') {
			localStorage.placas=placas;        
			$.mobile.changePage('placas.html');    
        }
    });
    
	$('#consultar-corralones').click(function(){
        $.mobile.changePage('corralones.html');
    });
    
    $('#consultar-verificentros').click(function(){
        $.mobile.changePage('verificentros.html');
    });
    
});

$(document).keypress(function(e) {
	if(e.which == 13) {
		$('#consultar-placas').trigger('click');
	}
});
