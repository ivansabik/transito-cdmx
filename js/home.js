$(document).on('pageshow',"#index",function(event){
	$('#logo').click(function(){
        $.mobile.changePage('index.html');
    });
    
    $('#consultar-placas').click(function(){
        var placas = $('#placas').val().toUpperCase();
        if(typeof(Storage)!=='undefined') {
			localStorage.placas=placas;            
        }
        $.mobile.changePage('placas.html');
    });
});
