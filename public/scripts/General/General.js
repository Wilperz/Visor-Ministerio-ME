General = new function () {

    this.SIMBOLO_PESO = '$';
    this.SEPARADOR_MILES = '.';
    this.SEPARADOR_DECIMALES = ',';


    this._exception = null;
    this._arrayCampos = new Array();
    this._uidBien = null;
    this._tituloBien = null;
    this._metodoBien = null;

    this.comando = function (fnRespuesta, pPARAMETROS, pSRV) {
        var self = this;
        try {
            //seguir("-------GET-------");
            //seguir(pPARAMETROS);
            //seguir(pSRV);
            //seguir("--------------");            
            $.ajax({
                type: 'GET',
                url: pSRV,
                data: pPARAMETROS,
                dataType: "json",
                success: function (response) {
                    try {
                        fnRespuesta(response);
                    } catch (e) {
                        self._exception(e);
                    }
                }
            });

        } catch (e) {
            self._exception(e);
        }
    };

    this.comandoPost = function (fnRespuesta, pPARAMETROS, pSRV) {
        var self = this;
        try {
            //seguir("-------POST-------");
            //seguir(pPARAMETROS);
            //seguir(pSRV);
            //seguir("--------------");
            $.ajax({
                type: 'POST',
                url: pSRV,
                data: pPARAMETROS,
                dataType: "json",
                success: function (response) {
                    try {
                        fnRespuesta(response);
                    } catch (e) {
                        Mensaje.excepcion(e);
                    }
                }
            });

        } catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this.comandoPostConParametros = function (fnRespuesta, pPARAMETROS, pSRV, pArregloParametrosOpcionales) {
        var self = this;
        try {
            //seguir("-------POST-------");
            //seguir(pPARAMETROS);
            //seguir(pSRV);
            //seguir("--------------");
            $.ajax({
                type: 'POST',
                url: pSRV,
                data: pPARAMETROS,
                dataType: "json",
                success: function (response) {
                    try {
                        fnRespuesta(response, pArregloParametrosOpcionales);
                    } catch (e) {
                        Mensaje.excepcion(e);
                    }
                }
            });

        } catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this._exception = function (e) {
        Mensaje.excepcion(e);
        return;
    };

    this.validarCamposRequeridos = function () {
        try {
            var continuar = true;
            var vImputs = $('input[requerido="true"]');
            var vSelects = $('select[requerido="true"]');
            var vTextArea = $('textarea[requerido="true"]');

            $(".requerido").each(function () {
                $(this).removeClass("requerido");
                $("#req_" + $(this).attr("id")).css("display", "none");
            });

            vImputs.each(function (index, ele) {
                var elem = $(ele);

                if (elem.val() == "") {
                    continuar = false;
                    elem.addClass("requerido");
                    $("#req_" + elem.attr("id")).css("display", "block");
                }
            });

            vSelects.each(function (index, ele) {
                var elem = $(ele);

                if (elem.val() == "-1") {
                    continuar = false;
                    elem.addClass("requerido");
                    $("#req_" + elem.attr("id")).css("display", "block");
                }
            });

            vTextArea.each(function (index, ele) {
                var elem = $(ele);

                if (elem.val() == "") {
                    continuar = false;
                    elem.addClass("requerido");
                    $("#req_" + elem.attr("id")).css("display", "block");
                }
            });

            return continuar;
        }
        catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this.limpiarCampos = function () {
        try {
            var continuar = true;
            var vImputs = $('input[type=text]');
            var vSelects = $('select');
            var vTextArea = $('textarea');
            var vCheck = $('input[type=checkbox]');

            $(".requerido").each(function () {
                $(this).removeClass("requerido");
                $("#req_" + $(this).attr("id")).css("display", "none");
            });

            vTextArea.each(function (index, ele) {
                var elem = $(ele);
                elem.val("");
            });

            vImputs.each(function (index, ele) {
                var elem = $(ele);
                elem.val("");
            });

            vSelects.each(function (index, ele) {
                var elem = $(ele);
                //Obtiene el valor del option marcado por defecto
                var sel = $("select#" + elem.attr("id") + " option[selected]").attr("value");
                elem.val(sel);
            });

            vCheck.each(function (index, ele) {
                var elem = $(ele);
                $('#' + elem.attr("id")).prop('checked', false);
            });

            return continuar;
        }
        catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this.HabilitarInhabiliatCampos = function (pOpcion) {
        try {
            var continuar = true;
            var vImputs = $('input[type=text]');
            var vSelects = $('select');
            var vTextArea = $('textarea');
            var vCheck = $('input[type=checkbox]');

            vTextArea.each(function (index, ele) {
                var elem = $(ele);

                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }

            });

            vImputs.each(function (index, ele) {
                var elem = $(ele);
                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            vSelects.each(function (index, ele) {
                var elem = $(ele);
                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            vCheck.each(function (index, ele) {
                var elem = $(ele);

                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            return continuar;
        }
        catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this.solonumeros = function (e, tipo, op, tam) {
        var charCode;
        if (navigator.appName == "Netscape") // me fijo 
            charCode = e.which; // leo la tecla en ASCII que ingreso
        else
            charCode = e.keyCode;

        if (op.value.length == tam && tam > 0) {
            if (charCode == 8 || charCode == 0)
                return true;
            else {
                MensajeBootstrap.informacion('La cantidad ingresada no debe superar los ' + tam + ' digitos');
                return false;
            }
        }
        else {
            if (tipo == 2) {
                if (charCode < 48 || charCode > 57) {
                    if (charCode < 48 && (charCode > 46 || charCode < 46)) {
                        if (charCode == 8 || charCode == 0)
                            return true;
                        else {
                            MensajeBootstrap.informacion("Solo pueden ser numeros o puntos");
                            return false;
                        }
                    }
                    else
                        if (charCode > 57) {
                            if (charCode == 8 || charCode == 0)
                                return true;
                            else {
                                MensajeBootstrap.informacion("Solo pueden ser numeros o puntos");
                                return false;
                            }

                        }
                }
            }
            else
                if ((charCode < 48 || charCode > 57) && charCode != 13) {
                    if (charCode == 8 || charCode == 0)
                        return true;
                    else {
                        MensajeBootstrap.informacion("Solo pueden ser numeros");
                        return false;
                    }
                }
        }
    };

    this.esLetra = function (caracter) {
        try {
            let ascii = caracter.toUpperCase().charCodeAt(0);
            return ascii > 64 && ascii < 91;
        }
        catch (e) {
            Mensaje.excepcion(e.message);
            return false;
        }
    };

    this.limpiarCamposContenedor = function (pIdContenedor) {
        try {
            var continuar = true;
            var vImputs = $('#' + pIdContenedor + ' input[type=text]');
            var vNumeros = $('#' + pIdContenedor + ' input[type=number]');
            var vSelects = $('#' + pIdContenedor + ' select');
            var vTextArea = $('#' + pIdContenedor + ' textarea');
            var vCheck = $('#' + pIdContenedor + ' input[type=checkbox]');
            var vRadio = $('#' + pIdContenedor + ' input[type=radio]');

            $(".requerido").each(function () {
                $(this).removeClass("requerido");
                $("#req_" + $(this).attr("id")).css("display", "none");
            });

            vTextArea.each(function (index, ele) {
                var elem = $(ele);
                elem.val("");
            });

            vImputs.each(function (index, ele) {
                var elem = $(ele);
                elem.val("");
            });

            vNumeros.each(function (index, ele) {
                var elem = $(ele);
                elem.val("");
            });

            vSelects.each(function (index, ele) {
                var elem = $(ele);
                //Obtiene el valor del option marcado por defecto
                var sel = $("select#" + elem.attr("id") + " option[selected]").attr("value");
                elem.val(sel);
            });

            vCheck.each(function (index, ele) {
                var elem = $(ele);
                $('#' + elem.attr("id")).prop('checked', false);
            });

            vRadio.each(function (index, ele) {
                var elem = $(ele);
                $('#' + elem.attr("id")).prop('checked', false);
            });

            return continuar;
        }
        catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this.validarCamposRequeridosContenedor = function (pIdContenedor) {
        try {
            var continuar = true;
            var vImputs = $('#' + pIdContenedor + ' input[requerido="true"]');
            var vSelects = $('#' + pIdContenedor + ' select[requerido="true"]');
            var vTextArea = $('#' + pIdContenedor + ' textarea[requerido="true"]');

            $(".requerido").each(function () {
                $(this).removeClass("requerido");
                $("#req_" + $(this).attr("id")).css("display", "none");
            });

            vImputs.each(function (index, ele) {
                var elem = $(ele);

                if (elem.val() == "") {
                    continuar = false;
                    elem.addClass("requerido");
                    $("#req_" + elem.attr("id")).css("display", "block");
                }
            });

            vSelects.each(function (index, ele) {
                var elem = $(ele);

                if (elem.val() == "-1") {
                    continuar = false;
                    elem.addClass("requerido");
                    $("#req_" + elem.attr("id")).css("display", "block");
                }
            });

            vTextArea.each(function (index, ele) {
                var elem = $(ele);

                if (elem.val() == "") {
                    continuar = false;
                    elem.addClass("requerido");
                    $("#req_" + elem.attr("id")).css("display", "block");
                }
            });

            return continuar;
        }
        catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this.HabilitarInhabiliatCamposContenedor = function (pIdContenedor, pOpcion) {
        try {
            var continuar = true;
            var vImputs = $('#' + pIdContenedor + ' input[type=text]');
            var vSelects = $('#' + pIdContenedor + ' select');
            var vTextArea = $('#' + pIdContenedor + ' textarea');
            var vCheck = $('#' + pIdContenedor + ' input[type=checkbox]');
            var vRadios = $('#' + pIdContenedor + ' input[type=radio]');
            var vPassword = $('#' + pIdContenedor + ' input[type=password]');

            vTextArea.each(function (index, ele) {
                var elem = $(ele);

                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }

            });

            vImputs.each(function (index, ele) {
                var elem = $(ele);
                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            vSelects.each(function (index, ele) {
                var elem = $(ele);
                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            vCheck.each(function (index, ele) {
                var elem = $(ele);

                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            vRadios.each(function (index, ele) {
                var elem = $(ele);

                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            vPassword.each(function (index, ele) {
                var elem = $(ele);
                if (pOpcion) {
                    elem.attr("disabled", "disabled");
                }
                else {
                    elem.removeAttr("disabled");
                }
            });

            return continuar;
        }
        catch (e) {
            Mensaje.excepcion(e);
        }
    };

    this.ValidarFechaMayorQue = function (fechaInicial, fechaFinal) {

        valuesStart = fechaInicial.split("/");
        valuesEnd = fechaFinal.split("/");

        // Verificamos que la fecha no sea posterior a la actual
        var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
        var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);

        if (dateStart >= dateEnd) {
            return 0;
        }

        return 1;

    };

    this.EsNumero = function (pId, pValor) {
        //https://uniwebsidad.com/libros/javascript/capitulo-7/validacion
        if (!isNaN(pValor)) {
            return true;
        }

        $("#" + pId).val("");
        MensajeBootstrap.informacion("Debe ser un valor numerico");

        return false;
    };

    this.mostrarUnSoloComponenteXContenedor = function (pComponente) {
        var vComponente = $('#' + pComponente);
        vComponente.show();
    };



    this.miReplaceAll = function (find, replace, str) {
        str = str + "";
        return str.replace(new RegExp(General.escapeRegExp(find), 'g'), replace);
    };


    this.toFloat = function (pNumero) {
        pSimboloDecimal = General.SEPARADOR_DECIMALES;
        pSimboloMiles = General.SEPARADOR_MILES;
        var vNumeroBase = pNumero;
        vNumeroBase = General.miReplaceAll('$', '', vNumeroBase);
        vNumeroBase = General.miReplaceAll(pSimboloMiles, '', vNumeroBase);
        vNumeroBase = General.miReplaceAll(pSimboloDecimal, '.', vNumeroBase);
        return parseFloat(vNumeroBase);
    };

    this.toFloatParaControler = function (pNumero) {
        var dummy = General.toFloat(pNumero);
        dummy = dummy + "";
        dummy = General.miReplaceAll('.', ',', dummy);
        return dummy;
    };

    this.monedaToFloat = function (pMoneda) {
        vNumeroBase = General.miReplaceAll('$', '', pMoneda);
        return General.toFloat(vNumeroBase);
    };

    this.toMoneda = function (number) {
        return General.SIMBOLO_PESO + General.number_format(number, 2, General.SEPARADOR_DECIMALES, General.SEPARADOR_MILES);
    };
    this.toFloatFormateado = function (number) {
        return General.number_format(number, 2, General.SEPARADOR_DECIMALES, General.SEPARADOR_MILES);
    };

    this.toFloatFormateadoNDecimales = function (number, pDecimales) {
        return General.number_format(number, pDecimales, General.SEPARADOR_DECIMALES, General.SEPARADOR_MILES);
    };



    this.vis_ponCampoDecimalXClassConFormatos = function (pClass, pNumeroDecimales, pAplicaNegativo) {
        pSimDec = General.SEPARADOR_DECIMALES;
        pSimMiles = General.SEPARADOR_MILES;
        var vMin = '0.00';
        if (pAplicaNegativo != undefined && pAplicaNegativo != 'undefined' && pAplicaNegativo && pAplicaNegativo == true)
            vMin = '-999999999999.99';

        $("." + pClass).autoNumeric({ aSep: pSimMiles, aDec: pSimDec, aSign: '', mDec: pNumeroDecimales, vMin: vMin });
        $("." + pClass).css("text-align", "right");
    };


    this.vis_ponCampoEntero = function (pIdCampo) {
        $("#" + pIdCampo).autoNumeric({
            aSep: '',
            aDec: '.',
            aSign: '',
            mDec: '0'
        });
        $("#" + pIdCampo).css("text-align", "right");
    };

    this.vis_ponCampoEnteroXClass = function (pClass) {
        $("." + pClass).autoNumeric({
            aSep: '',
            aDec: '.',
            aSign: '',
            mDec: '0'
        });
        $("." + pClass).css("text-align", "right");
    };

    this.escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    this.miReplaceAll = function (find, replace, str) {
        return str.replace(new RegExp(General.escapeRegExp(find), 'g'), replace);
    };


    this.toFloat = function (pNumero) {
        pSimboloDecimal = General.SEPARADOR_DECIMALES;
        pSimboloMiles = General.SEPARADOR_MILES;
        var vNumeroBase = pNumero;
        vNumeroBase = General.miReplaceAll('$', '', vNumeroBase);
        vNumeroBase = General.miReplaceAll(pSimboloMiles, '', vNumeroBase);
        vNumeroBase = General.miReplaceAll(pSimboloDecimal, '.', vNumeroBase);
        return parseFloat(vNumeroBase);
    };

    this.toFloatParaControler = function (pNumero) {
        var dummy = General.toFloat(pNumero);
        dummy = dummy + "";
        dummy = General.miReplaceAll('.', ',', dummy);
        return dummy;
    };

    this.monedaToFloat = function (pMoneda) {
        vNumeroBase = General.miReplaceAll('$', '', pMoneda);
        return General.toFloat(vNumeroBase);
    };

    this.toMoneda = function (number) {
        return General.SIMBOLO_PESO + General.number_format(number, 2, General.SEPARADOR_DECIMALES, General.SEPARADOR_MILES);
    };
    this.toFloatFormateado = function (number) {
        return General.number_format(number, 2, General.SEPARADOR_DECIMALES, General.SEPARADOR_MILES);
    };

    this.toFloatFormateadoNDecimales = function (number, pDecimales) {
        return General.number_format(number, pDecimales, General.SEPARADOR_DECIMALES, General.SEPARADOR_MILES);
    };



    this.number_format = function (number, decimals, dec_point, thousands_sep) {
        // http://kevin.vanzonneveld.net
        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +     bugfix by: Michael White (http://getsprink.com)
        // +     bugfix by: Benjamin Lupton
        // +     bugfix by: Allan Jensen (http://www.winternet.no)
        // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +     bugfix by: Howard Yeend
        // +    revised by: Luke Smith (http://lucassmith.name)
        // +     bugfix by: Diogo Resende
        // +     bugfix by: Rival
        // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
        // +   improved by: davook
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Jay Klehr
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Amir Habibi (http://www.residence-mixte.com/)
        // +     bugfix by: Brett Zamir (http://brett-zamir.me)
        // +   improved by: Theriault
        // +      input by: Amirouche
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // *     example 1: number_format(1234.56);
        // *     returns 1: '1,235'
        // *     example 2: number_format(1234.56, 2, ',', ' ');
        // *     returns 2: '1 234,56'
        // *     example 3: number_format(1234.5678, 2, '.', '');
        // *     returns 3: '1234.57'
        // *     example 4: number_format(67, 2, ',', '.');
        // *     returns 4: '67,00'
        // *     example 5: number_format(1000);
        // *     returns 5: '1,000'
        // *     example 6: number_format(67.311, 2);
        // *     returns 6: '67.31'
        // *     example 7: number_format(1000.55, 1);
        // *     returns 7: '1,000.6'
        // *     example 8: number_format(67000, 5, ',', '.');
        // *     returns 8: '67.000,00000'
        // *     example 9: number_format(0.9, 0);
        // *     returns 9: '1'
        // *    example 10: number_format('1.20', 2);
        // *    returns 10: '1.20'
        // *    example 11: number_format('1.20', 4);
        // *    returns 11: '1.2000'
        // *    example 12: number_format('1.2000', 3);
        // *    returns 12: '1.200'
        // *    example 13: number_format('1 000,50', 2, '.', ' ');
        // *    returns 13: '100 050.00'
        // Strip all characters but numerical ones.
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.round(n * k) / k;
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    };

    this.escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };


    this.procesando = function () {
        /*
        var progressbar = $("#progressbar"),
            progressLabel = $(".progress-label");
        progressbar.progressbar({
            value: false
        });
        */
        General.visibleComponente('div_procesando', 'Visible');
    }
    this.quitarprocesando = function () {
        General.visibleComponente('div_procesando', 'NoVisible');
    }


    

    this.visibleComponente = function(vId, vEstado) {
        if (vEstado == 'Visible') {
            $('#' + vId).show();
        }
        else {
            $('#' + vId).hide();
        }
    }


    this.ExportarExcel = function (pIdTabla, pNombreArchivo) {
        var table = $("#" + pIdTabla);
        if (table && table.length) {
            var preserveColors = (table.hasClass('table2excel_with_colors') ? true : false);
            $(table).table2excel({
                exclude: ".noExl",
                name: "Excel Document Name",
                filename: pNombreArchivo + "" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
                fileext: ".xls",
                exclude_img: true,
                exclude_links: true,
                exclude_inputs: true,
                preserveColors: preserveColors
            });
        }
    }
}