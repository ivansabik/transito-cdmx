API Tránsito DF
===========

API REST no oficial de Tránsito DF, proporciona diversa info relacionada con aun auto por medio del número de placas como son adeudos de tenencia e infracciones. 
Desarrollado como prueba en PHP, utiliza Composer para las librerías dependientes que son:

- php-simple-html-dom-parser
- php-curl-class
- json-pretty

Puedes probarla en http://mexicapis.org.mx/transitodf/, ej. con un Carrot que manejó Mancera (que por cierto le debe $30,000 pesos al gobierno) con http://mexicapis.org.mx/transitodf/vehiculos/183YTP:

- Los verificentros en http://mexicapis.org.mx/transitodf/verificentros
- Los corralones en http://mexicapis.org.mx/transitodf/corralones

![Carrot Mancera](http://438424cd093f86f0c7e0-2cd4f1b3b970cf6c05d6a60490c230b4.r88.cf2.rackcdn.com/mancera300613_g.jpg)

## API

Endpoints:

- /vehiculos/NUMERO_PLACA
- /verificentros
- /corralones

## CLI

Para los amantes de la línea de comandos:

- Información de un vehículo ```php transito-df NUMERO_DE_PLACA``` ó ```./transito-df NUMERO_DE_PLACA```
- Lista de verificentros ```php transito-df verificentros``` ó ```./transito-df verificentros```

## Ejemplos

### /vehiculos/183YTP


```

{
    "vehiculo": {
        "placas": "183YTP",
        "modelo": 2012,
        "num_cilindros": 4,
        "procedencia_nacional": true,
        "valor_factura": 615288,
        "clave_vehicular": "0044801",
        "fecha_factura": "2012-11-30",
        "rfc": "Persona Moral",
        "depreciacion": 446083.8,
        "infracciones": [
            {
                "folio": "04144419377",
                "fecha": "2014-07-11",
                "pagada": true,
                "motivo": "POR NO AJUSTARSE EL CINTURÓN DE SEGURIDAD Y ASEGURARSE QUE LOS DEMÁS PASAJEROS TAMBIÉN SE LO AJUSTEN, CUANDO SE TRATE DE MENORES DE 12 AÑOS O PERSONAS CON DISCAPACIDAD, DEBERÁN SER TRANSPORTADOS UTILIZANDO LOS SISTEMAS DE RETENCIÓN PERTINENTES.",
                "fundamento": {
                    "articulo": " 5",
                    "fraccion": " VI"
                },
                "sancion": {
                    "dias_sm": 5,
                    "monto": 336.45
                }
            },
            {
                "folio": "03038482657",
                "fecha": "2013-09-06",
                "pagada": false,
                "motivo": "POR NO RESPETAR LOS LÍMITES DE VELOCIDAD ESTABLECIDOS EN VÍAS PRIMARIAS, EN CASO DE NO HABER SEÑALAMIENTO   LA VELOCIDAD MÁXIMA SERÁ DE 70 KILÓMETROS POR HORA",
                "fundamento": {
                    "articulo": " 5",
                    "fraccion": " V"
                },
                "sancion": {
                    "dias_sm": 5,
                    "monto": 336.45
                }
            },
            {
                "folio": "01124087441",
                "fecha": "2012-12-19",
                "pagada": true,
                "motivo": "POR ESTACIONARSE EN ZONAS O VÍAS PÚBLICAS  DONDE EXISTA SEÑALIZACIÓN VÍAL RESTRICTIVA",
                "fundamento": {
                    "articulo": " 12",
                    "fraccion": " II"
                },
                "sancion": {
                    "dias_sm": 10,
                    "monto": 672.9
                }
            }
        ],
        "adeudos_tenencia": [
            {
                "anio": 2013,
                "tenencia": 13977.37,
                "subsidio": 0,
                "actualizacion_tenencia": 904.33,
                "recargo_tenencia": 1440.54,
                "condonacion_recargo_tenencia": 1440.54,
                "total_tenencia": 14881.7,
                "derecho": 411,
                "actualizacion_derecho": 26.59,
                "recargo_derecho": 42.35,
                "total_derechos": 479.94,
                "total_impuesto": 13977.37,
                "total_derecho": 411,
                "total_actualizacion": 930.92,
                "total_recargo": 42.35,
                "total": 15362,
                "linea_captura": "85112XX183YTPJ33TR7K",
                "vigencia": "2015-01-31"
            },
            {
                "anio": 2014,
                "tenencia": 12352.27,
                "subsidio": 0,
                "actualizacion_tenencia": 322.39,
                "recargo_tenencia": 1024.11,
                "condonacion_recargo_tenencia": 1024.11,
                "total_tenencia": 12674.66,
                "derecho": 434,
                "actualizacion_derecho": 11.32,
                "recargo_derecho": 35.98,
                "total_derechos": 481.3,
                "total_impuesto": 12352.27,
                "total_derecho": 434,
                "total_actualizacion": 333.71,
                "total_recargo": 35.98,
                "total": 13156,
                "linea_captura": "85112XX183YTPJ31C781",
                "vigencia": "2015-01-31"
            }
        ],
        "total_adeudos": 29863.8
    }
}
```

### /verificentros

```
{
	"verificentros": [
		{
			"numero": "9001",
			"razon_social": "CONTROL AMBIENTAL IXTAPALAPA, S.A. DE C.V.",
			"direccion": "PEDRO ACEVES # 70 ESQ. CAYETANO ANDRADE, COL. STA. MARTHA ACATITLA",
			"delegacion": "IZTAPALAPA",
			"telefonos": "57335157 57347163",
			"latitud": "19.3672",
			"lon": "-99.0182",
			"id": 0
		},
		{
			"numero": "9002",
			"razon_social": "CONTROL ATMOSFERICO DE MEXICO, S.A. DE C.V.",
			"direccion": "RODOLFO GAONA # 86, COL. LOMAS DE SOTELO",
			"delegacion": "MIGUEL HIDALGO",
			"telefonos": "52803460",
			"latitud": "19.4522",
			"lon": "-99.218",
			"id": 1
		},
		...
	]
}
```

### /corralones


```
{
  "corralones": [
    {
      "nombre": "Cien Metros",
      "calle": "Eje Central L\u00e1zaro C\u00e1rdenas",
      "colonia": "Nueva Industrial Vallejo",
      "delegacion": "Gustavo A. Madero",
      "cp": "07700",
      "calle_entre_1": "Cda. de 100 Metros",
      "calle_entre_2": "Puente Fortuna",
      "direccion": "Eje Central L\u00e1zaro C\u00e1rdenas(camell\u00f3n central) No. S\/N , Col. Nueva Industrial Vallejo",
      "latitud": 19.48379,
      "longitud": -99.14289,
      "telefono": 57194368,
      "estado": "activo"
    },
    {
      "nombre": "El Zarco",
      "calle": "Av. Talism\u00e1n",
      "colonia": "San Juan de Arag\u00f3n",
      "delegacion": "Gustavo A. Madero",
      "cp": "07900",
      "esquina": "Gran Canal",
      "direccion": "Av. Talism\u00e1n s\/n esquina Gran Canal, Col. San Juan de Arag\u00f3n",
      "latitud": -99.095006,
      "longitud": 19.466936,
      "telefono": 57417855,
      "estado": "activo"
    },
    ...
  ]
}
```
