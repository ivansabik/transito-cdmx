function Vehiculo(json) {
    this.placas = json['vehiculo']['placas'];
    this.modelo = json['vehiculo']['modelo'];
    this.procedencia = json['vehiculo']['procedencia'];
    this.valorFactura = json['vehiculo']['valor_factura'];
    this.claveVehicular = json['vehiculo']['clave_vehicular'];
    this.fechaFactura = json['vehiculo']['fecha_factura'];
    this.rfc = json['vehiculo']['rfc'];
    this.depreciacion = json['vehiculo']['depreciacion'];
    this.totalAdeudos = json['vehiculo']['total_adeudos'];
    var infracciones = [];
    for (var i = 0; i < json['vehiculo']['infracciones'].length; i++) {
        var infraccion = new Infraccion();
        infraccion.folio = json['vehiculo']['infracciones'][i]['folio'];
        infraccion.fecha = json['vehiculo']['infracciones'][i]['fecha'];
        infraccion.pagada = json['vehiculo']['infracciones'][i]['pagada'];
        infraccion.motivo = json['vehiculo']['infracciones'][i]['motivo'];
        infraccion.sancionDias = json['vehiculo']['infracciones'][i]['sancion']['dias_sm'];
        infraccion.sancionMonto = json['vehiculo']['infracciones'][i]['sancion']['monto'];
        infracciones.push(infraccion);
    }
    this.infracciones = infracciones;
    var adeudos = [];
    for (var i = 0; i < json['vehiculo']['adeudos_tenencia'].length; i++) {
        var adeudo = new Adeudo();
        adeudo.anio = json['vehiculo']['adeudos_tenencia'][i]['anio'];
        adeudo.totalImpuesto = json['vehiculo']['adeudos_tenencia'][i]['total_impuesto'];
        adeudo.totalDerecho = json['vehiculo']['adeudos_tenencia'][i]['total_derecho'];
        adeudo.totalActualizacion = json['vehiculo']['adeudos_tenencia'][i]['total_actualizacion'];
        adeudo.totalRecargo = json['vehiculo']['adeudos_tenencia'][i]['total_recargo'];
        adeudo.totalTenencia = json['vehiculo']['adeudos_tenencia'][i]['total_tenencia'];
        adeudos.push(adeudo);
    }
    this.adeudosTenencia = adeudos;
    this.toHtml = function () {
        var html = '<div class="cuadro-info">';
        if (this.placas) {
            html += '<span class="titulo">Placas: </span><span>' + this.placas + '</span></br>';
        }
        if (this.modelo) {
            html += '<span class = "titulo" >Modelo: </span><span>' + this.modelo + '</span></br>';
        }
        if (this.procedencia) {
            html += '<span class = "titulo" >Procedencia: </span><span>' + this.procedencia + '</span></br>';
        }
        if (this.valorFactura) {
            html += '<span class = "titulo" >Valor factura: </span><span class="cacao">' + this.valorFactura + '</span></br>';
        }
        if (this.claveVehicular) {
            html += '<span class = "titulo" >Clave vehicular: </span><span>' + this.claveVehicular + '</span></br>';
        }
        if (this.fechaFactura) {
            html += '<span class = "titulo" >Fecha factura: </span><span>' + this.fechaFactura + '</span></br>';
        }
        if (this.rfc) {
            html += '<span class = "titulo" >RFC: </span><span>' + this.rfc + '</span></br>';
        }
        if (this.depreciacion) {
            html += '<span class = "titulo" >Monto depreciación: </span><span class="cacao">' + this.depreciacion + '</span></br>';
        }
        if (this.placas) {
            html += '<span class = "titulo" >Total adeudos: </span><span class="cacao">' + this.totalAdeudos + '</span>';
        }
        html += '</div></br>';
        return html;
    };

    this.guardaLocal = function () {
    }; // asigna ttl y guarda
}

// TODO: Regex para placas
Vehiculo.validaPlacas = function (placas) {
    if (placas.length !== 6) {
        return false;
    }
    return true;
};

Vehiculo.existeLocal = function (placas) {
}; // busca si está guardado

function Corralon() {
    this.toHtml = function () {
        var html = '<div class="cuadro-info"> \
        <h4>' + this.nombre + '</h4> \
        <span class="titulo">Dirección: </span><span>' + this.direccion + '</span></br> \
        <span class="titulo">Delegación: </span><span>' + this.delegacion + '</span></br>';
        if (this.telefono) {
            html += '<span class="titulo">Teléfono: </span>' + this.telefono + '</span></br> \
            <p><a href="tel:' + this.telefono + '"><button data-role="button" data-icon="phone">Llamar</button></a></p>';
        }
        html += '<p><a href="#" onclick="window.open(\'' + URL_GMAPS_MAPA + this.latitud + ',' + this.longitud + '\', \'_system\');"><button data-role="button" data-icon="location">Ver en mapa</button></a></p> \
        <p><a href="#" onclick="window.open(\'' + URL_GMAPS_DIR + this.latitud + ',' + this.longitud + '\', \'_system\');"><button data-role="button" data-icon="navigation">¿Cómo llegar?</button></p> \
        </div></br>';
        return html;
    };
}

function Verificentro() {
    this.toHtml = function () {
        var html = '<div class="cuadro-info"> \
        <h4>' + this.razon_social + '</h4> \
        <span class="titulo">Dirección: </span><span>' + this.direccion + '</span></br> \
        <span class="titulo">Delegación: </span><span>' + this.delegacion + '</span></br>';
        if (this.telefono) {
            html += '<span class="titulo">Teléfono: </span>' + this.telefono + '</span></br> \
            <p><a href="tel:' + this.telefono + '"><button data-role="button" data-icon="phone">Llamar</button></a></p>';
        }
        html += '<p><a href="#" onclick="window.open(\'' + URL_GMAPS_MAPA + this.latitud + ',' + this.longitud + '\', \'_system\');"><button data-role="button" data-icon="location">Ver en mapa</button></a></p> \
        <p><a href="#" onclick="window.open(\'' + URL_GMAPS_DIR + this.latitud + ',' + this.longitud + '\', \'_system\');"><button data-role="button" data-icon="navigation">¿Cómo llegar?</button></p> \
        </div></br>';
        return html;
    };
}

function Adeudo() {
    this.toHtml = function () {
        var html = '<div class="cuadro-info"> \
        <span class="titulo">Año: </span> \
        <span>' + this.anio + '</span></br> \
        <span class="titulo">Impuesto: </span> \
        <span class="cacao">' + this.totalImpuesto + '</span></br> \
        <span class="titulo">Derechos: </span> \
        <span class="cacao">' + this.totalDerecho + '</span></br> \
        <span class="titulo">Actualización: </span> \
        <span class="cacao">' + this.totalActualizacion + '</span></br> \
        <span class="titulo">Recargos: </span> \
        <span class="cacao">' + this.totalRecargo + '</span></br> \
        <span class="titulo">Total: </span> \
        <span class="cacao">' + this.totalTenencia + '</span></br> \
        </div></br>';
        return html;
    };
}

function Infraccion() {
    this.pagada = false;
    this.toHtml = function () {
        var textoPagada = 'No';
        if (this.pagada) {
            textoPagada = 'Sí';
        }
        var html = '<div class="cuadro-info"> \
        <span class="titulo">Folio: </span><span>' + this.folio + '</span></br> \
        <span class="titulo">Fecha: </span><span>' + this.fecha + '</span></br> \
        <span class="titulo">Pagada: </span><span>' + textoPagada + '</span></br> \
        <span class="titulo">Motivo: </span><span>' + this.motivo + '</span></br> \
        <span class="titulo">Multa en días de salario: </span><span>' + this.sancionDias + '</span></br> \
        <span class="titulo">Multa estimada: </span><span class="cacao">' + this.sancionMonto + '</span></br> \
        </div></br>';
        return html;
    };
}