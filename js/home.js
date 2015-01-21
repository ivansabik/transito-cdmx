$(document).ready(function(){
    var URL_CONSULTA_PLACAS = '/app/placas.html#';
    $('#consultar-placas').click(function(){
        var placas = $('#placas').val().toUpperCase();
        window.location.href = URL_CONSULTA_PLACAS + placas;
    });
    
});
