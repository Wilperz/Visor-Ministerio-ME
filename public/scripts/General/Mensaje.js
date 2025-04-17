/* global Constantes */
function seguir(pDato) {
    Mensaje.seguimientoObjeto(pDato);
}

Mensaje = new function () {

    this.error = function (pMensaje) {
        try {
            seguir("mensaje: " + pMensaje);
            alert("Error. " + pMensaje);
        }
        catch (e) {
            Mensaje.excepcion(e);
            return false;
        }
    };

    this.exito = function (pMensaje) {
        try {
            alert(pMensaje);
        }
        catch (e) {
            Mensaje.excepcion(e);
            return false;
        }
    };

    this.informacion = function (pMensaje) {
        try {
            alert(pMensaje);
        }
        catch (e) {
            Mensaje.excepcion(e);
            return false;
        }
    };

    this.excepcion = function (pException) {
        try {
            //console.log(pException.message + " - " + pException.description);
            this.seguimientoObjeto(pException);
        }
        catch (e) {
            console.log(e.message + " - " + e.description);
            return false;
        }
    };

    this.seguimientoObjeto = function (pDato) {        
        console.log(JSON.stringify(pDato));
    };
};

MensajeBootstrap = new function () {

    this.error = function (pMensaje) {
        try {
            $('#titulo').html("Error");
            $('#texto').html(pMensaje);
            $('#exampleModalCenter').modal('show');
        }
        catch (e) {
            Mensaje.excepcion(e);
            return false;
        }
    };

    this.informacion = function (pMensaje) {
        try {

            $('#titulo').html("Mensaje");
            $('#texto').html(pMensaje);
            $('#exampleModalCenter').modal('show');
        }
        catch (e) {
            Mensaje.excepcion(e);
            return false;
        }
    };
}