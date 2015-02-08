<?php
use Sunra\PhpSimple\HtmlDomParser;
use \Curl\Curl;

define('SM_VIGENTE', 67.29);
define('URL_INFRACCIONES', 'http://www.finanzas.df.gob.mx/sma/detallePlaca.php?placa=');
define('URL_TENENCIA', 'http://www.finanzas.df.gob.mx/consultas_pagos/consulta_adeudosten.php?consulta=Consulta+de+adeudos&wlplaca=');
define('URL_CALCULO_TENENCIA',  'http://www.finanzas.df.gob.mx/formato_lc/lc/tenencia/calculo/validaPlaca');

$infoAuto = array();
$infoAuto['placas'] = $placas;
# Las globales se iran en algún refactor a objetos
$GLOBALS['sumaAdeudos'] = 0.00;

# Infracciones
$dom = HtmlDomParser::file_get_html(URL_INFRACCIONES . $placas);
$tablasInfracciones = $dom->find('#tablaDatos');
$infracciones = array();
foreach($tablasInfracciones as $tablaInfrancciones) {
    $infraccion = array();
    $infraccion['folio'] = html_entity_decode($tablaInfrancciones->find('td', 0)->plaintext); # Folio
    # Sin adeudos! termina de parsear infracciones
    if(preg_match("/Sin/i", $infraccion['folio']))
        break;
    $infraccion['fecha'] = html_entity_decode($tablaInfrancciones->find('td', 1)->plaintext); # Fecha de infracción
    $infraccion['pagada'] = parsePagada($tablaInfrancciones->find('td', 2)->plaintext); # Situación
    if(!$infraccion['pagada']) {
        $infraccion['motivo'] = html_entity_decode($tablaInfrancciones->find('td', 5)->plaintext); # Motivo
        $infraccion['fundamento'] = parseFundamento($tablaInfrancciones->find('td', 7)->plaintext); # Fundamento
        $infraccion['sancion'] = parseSancion(html_entity_decode($tablaInfrancciones->find('td', 9)->plaintext)); #Sanción
        $GLOBALS['sumaAdeudos'] += $infraccion['sancion']['monto'];
    } else {
        $infraccion['motivo'] = html_entity_decode($tablaInfrancciones->find('td', 4)->plaintext); # Motivo
        $infraccion['fundamento'] = parseFundamento($tablaInfrancciones->find('td', 6)->plaintext); # Fundamento
        $infraccion['sancion'] = parseSancion(html_entity_decode($tablaInfrancciones->find('td', 8)->plaintext)); #Sanción
    }
    $infracciones[] = $infraccion;
}

# Adeudos tenencia
$dom = HtmlDomParser::file_get_html(URL_TENENCIA . $placas);
$tdAdeudos = $dom->find('#tabla500 td');
$aniosAdeudosTenencia = array();
foreach($tdAdeudos as $tdAdeudo) {
    if(preg_match('/^\d{4}\b/', $tdAdeudo->plaintext))
        $aniosAdeudosTenencia[] = $tdAdeudo->plaintext;
}

# Si no tiene adeudos de tenencia, busca info general
# TODO: Refactor se repite abajo
if(empty($aniosAdeudosTenencia)) {
	$curl = new Curl();
	$curl->post(URL_CALCULO_TENENCIA, array(
		'placa' => $placas,
		'ejercicio' => 2015,
	));
	$jsonCalculoTenencia = json_decode($curl->response, true);
	$infoAuto['modelo'] = (int)$jsonCalculoTenencia['modelo'];
	if($jsonCalculoTenencia['procedencia'] == 'N')
		$infoAuto['procedencia'] = 'Nacional';
	elseif($jsonCalculoTenencia['procedencia'] == 'E')
		$infoAuto['procedencia'] = 'Extranjera';
	else 
		$infoAuto['procedencia'] = $jsonCalculoTenencia['procedencia'];
	$infoAuto['valor_factura'] = (double)$jsonCalculoTenencia['valor_fact'];
	$infoAuto['clave_vehicular'] = $jsonCalculoTenencia['cve_vehi'];
	$infoAuto['fecha_factura'] = $jsonCalculoTenencia['fech_factura'];
	$infoAuto['rfc'] = $jsonCalculoTenencia['rfc'];
	$infoAuto['depreciacion'] = (double)$jsonCalculoTenencia['depresiacion'];
}

# Cálculos de tenencias que adeuda
# TODO: Refactor se repite arriba
$adeudosTenencia = array();
foreach($aniosAdeudosTenencia as $anioAdeudo) {
    $adeudoTenencia = array();
    $curl = new Curl();
    $curl->post(URL_CALCULO_TENENCIA, array(
        'placa' => $placas,
        'ejercicio' => $anioAdeudo,
    ));
    $jsonCalculoTenencia = json_decode($curl->response, true);
    
    if(isset($jsonCalculoTenencia['error_msg'])) {
        $adeudoTenencia['anio'] = $anioAdeudo;
        $adeudosTenencia[] = $adeudoTenencia;
        continue;
    }
    
    # Repetimos los generales del auto
    $infoAuto['modelo'] = (int)$jsonCalculoTenencia['modelo'];
    if($jsonCalculoTenencia['procedencia'] == 'N')
        $infoAuto['procedencia'] = 'Nacional';
    elseif($jsonCalculoTenencia['procedencia'] == 'E')
        $infoAuto['procedencia'] = 'Extranjera';
    else 
		$infoAuto['procedencia'] = procedencia_nacional;
    $infoAuto['valor_factura'] = (double)$jsonCalculoTenencia['valor_fact'];
    $infoAuto['clave_vehicular'] = $jsonCalculoTenencia['cve_vehi'];
    $infoAuto['fecha_factura'] = $jsonCalculoTenencia['fech_factura'];
    $infoAuto['rfc'] = $jsonCalculoTenencia['rfc'];
    $infoAuto['depreciacion'] = (double)$jsonCalculoTenencia['depresiacion']; # Nótese el "typo"
    # Específicos de adeudo
    $adeudoTenencia['anio'] = (int)$anioAdeudo;
    $adeudoTenencia['tenencia'] = (double)$jsonCalculoTenencia['tenencia'];
    $adeudoTenencia['subsidio'] = (double)$jsonCalculoTenencia['subsidio'];
    $adeudoTenencia['actualizacion_tenencia'] = (double)$jsonCalculoTenencia['actualiza_ten'];
    $adeudoTenencia['recargo_tenencia'] = (double)$jsonCalculoTenencia['recargo_ten'];
    $adeudoTenencia['condonacion_recargo_tenencia'] = (double)$jsonCalculoTenencia['condonacion_recargo_ten'];
    $adeudoTenencia['total_tenencia'] = (double)$jsonCalculoTenencia['total_tenencia'];
    $adeudoTenencia['derecho'] = (double)$jsonCalculoTenencia['derecho'];
    $adeudoTenencia['actualizacion_derecho'] = (double)$jsonCalculoTenencia['actuliza_derecho'];
    $adeudoTenencia['recargo_derecho'] = (double)$jsonCalculoTenencia['recargo_derecho'];
    $adeudoTenencia['total_derecho'] = (double)$jsonCalculoTenencia['total_derechos'];
    $adeudoTenencia['total_impuesto'] = (double)$jsonCalculoTenencia['total_impuesto'];
    $adeudoTenencia['total_actualizacion'] = (double)$jsonCalculoTenencia['total_actualiza'];
    $adeudoTenencia['total_recargo'] = (double)$jsonCalculoTenencia['total_recargo'];
    $adeudoTenencia['total'] = (double)$jsonCalculoTenencia['total'];
    $GLOBALS['sumaAdeudos'] += $adeudoTenencia['total'];
    $adeudosTenencia[] = $adeudoTenencia;
}

$infoAuto['infracciones'] = $infracciones;
$infoAuto['adeudos_tenencia'] = $adeudosTenencia;
$infoAuto['total_adeudos'] = $GLOBALS['sumaAdeudos'];
$consulta['vehiculo'] = $infoAuto;

# Funciones
function parsePagada($textoEstadoPago) {
    if(preg_match("/NO/i", $textoEstadoPago))
        return false;
    return true;
}
function parseFundamento($textoFundamento) {
    $fundamento = array();
    $textoFundamento = html_entity_decode($textoFundamento);
    $partesFundamento = explode(',', $textoFundamento);
    $partesFundamento = preg_replace("/^.*\:/", "", $partesFundamento);
    $fundamento['articulo'] = preg_replace('/\s+/', '', $partesFundamento[0]);
    $fundamento['fraccion'] = preg_replace('/\s+/', '', $partesFundamento[1]);
    # Aqui se busca el texto del articulo/fraccion
    return $fundamento;
}
function parseSancion($textoSancion) {
    $sancion = array();
    $textoSancion = html_entity_decode($textoSancion);
    $textoSancion = preg_replace('/[^\d]+/', '', $textoSancion);
    $sancion['dias_sm'] = (int)$textoSancion;
    $montoSancion = (double)$textoSancion * SM_VIGENTE;
    $sancion['monto'] = $montoSancion;
    return $sancion;
}
?>

