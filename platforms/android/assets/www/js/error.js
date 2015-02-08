$(document).on('pageshow','#error',function(event){
	if(typeof(Storage) !== 'undefined') {
		var msjError = localStorage.msjError; 
		$('#msj-error').html(msjError);
	}
});
