$(document).ready(function(){
    $.getJSON('/app/json/verificentros.json',function(corralonesJson){
        console.log(corralonesJson);
    });
});
