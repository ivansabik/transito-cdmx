<?php
# Src: https://gist.github.com/robflaherty/1185299

use Camspiers\JsonPretty\JsonPretty;

$feed = 'http://datos.labplc.mx/datasets/download/verificentros';
$keys = array();
$newArray = array();
function csvToArray($file, $delimiter) { 
  if (($handle = fopen($file, 'r')) !== FALSE) { 
    $i = 0; 
    while (($lineArray = fgetcsv($handle, 4000, $delimiter, '"')) !== FALSE) { 
      for ($j = 0; $j < count($lineArray); $j++) { 
        $arr[$i][$j] = $lineArray[$j]; 
      } 
      $i++; 
    } 
    fclose($handle); 
  } 
  return $arr; 
} 
$data = csvToArray($feed, ',');
$count = count($data) - 1;
$labels = array_shift($data);  
foreach ($labels as $label) {
  $keys[] = $label;
}
$keys[] = 'id';
for ($i = 0; $i < $count; $i++) {
  $data[$i][] = $i;
}
for ($j = 0; $j < $count; $j++) {
  $d = array_combine($keys, $data[$j]);
  $newArray[$j] = $d;
}
$verificentrosJson = array();
$verificentrosJson['verificentros'] = $newArray;
$jsonPretty = new JsonPretty();
file_put_contents('verificentros.json', $jsonPretty->prettify(json_encode($verificentrosJson)));
?>
