function Vehiculo(json) {
    this.placas = json['placa'];
    this.modelo = json['modelo'];
    if(json['procedencia_nacional']) {
      this.procedencia = 'Nacional';
    } else {
      this.procedencia = 'Extranjera';
    }
    this.valorFactura = json['valor_factura'];
    this.fechaFactura = json['fecha_factura'];
    this.depreciacion = json['depreciacion'];
    this.totalAdeudos = json['monto_total_adeudos'];
    var infracciones = [];
    for (var i = 0; i < json['infracciones'].length; i++) {
        var infraccion = new Infraccion();
        infraccion.folio = json['infracciones'][i]['folio'];
        infraccion.fecha = json['infracciones'][i]['fecha'];
        infraccion.pagada = json['infracciones'][i]['pagada'];
        infraccion.motivo = json['infracciones'][i]['motivo'];
        infraccion.sancion = json['infracciones'][i]['sancion'];
        infraccion.sancionMonto = json['infracciones'][i]['monto_infraccion'];
        infracciones.push(infraccion);
    }
    this.infracciones = infracciones;
    var adeudos = [];
    for (var i = 0; i < json['adeudos_tenencias'].length; i++) {
        var adeudo = new Adeudo();
        adeudo.anio = json['adeudos_tenencias'][i]['ejercicio'];
        adeudo.totalImpuesto = json['adeudos_tenencias'][i]['total_impuesto'];
        adeudo.totalDerecho = json['adeudos_tenencias'][i]['total_derecho'];
        adeudo.totalActualizacion = json['adeudos_tenencias'][i]['total_actualiza'];
        adeudo.totalRecargo = json['adeudos_tenencias'][i]['total_recargo'];
        adeudo.totalTenencia = json['adeudos_tenencias'][i]['total'];
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
        if (this.fechaFactura) {
            html += '<span class = "titulo" >Fecha factura: </span><span>' + this.fechaFactura + '</span></br>';
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
};

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
        <span class="titulo">Multa en días de salario: </span><span>' + this.sancion + '</span></br> \
        <span class="titulo">Multa estimada: </span><span class="cacao">' + this.sancionMonto + '</span></br> \
        </div></br>';
        return html;
    };
}
