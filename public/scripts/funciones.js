
function F1_formatearNumeroCifrasSignificativas(numeroTexto, simboloDecimal, simboloMiles, cifrasSignificativas) {
    let numero = parseFloat(numeroTexto);
    if (isNaN(numero)) return "Número inválido";

    if (numero === 0) {
        return (0).toFixed(cifrasSignificativas - 1).replace('.', simboloDecimal);
    }

    // Redondear a cifras significativas
    function redondear(num, cifras) {
        const d = Math.ceil(Math.log10(Math.abs(num)));
        const factor = Math.pow(10, cifras - d);
        return Math.round(num * factor) / factor;
    }

    const redondeado = redondear(numero, cifrasSignificativas);

    // Convertir a string con la cantidad adecuada de cifras significativas
    const redondeadoStr = redondeado.toPrecision(cifrasSignificativas);

    // Convertimos a número con punto fijo (para no perder ceros)
    const [entero, decimales] = redondeadoStr.split('.');
    let partes = entero.split('');
    let resultado = '';

    // Insertar separadores de miles
    let contador = 0;
    for (let i = partes.length - 1; i >= 0; i--) {
        resultado = partes[i] + resultado;
        contador++;
        if (i > 0 && contador % 3 === 0) {
            resultado = simboloMiles + resultado;
        }
    }

    // Agregar decimales si existen
    if (decimales !== undefined) {
        resultado += simboloDecimal + decimales;
    }

    return resultado;
}

/*
function F2_formatearNumeroCifrasSignificativasEnMillones(numeroTexto, simboloDecimal, simboloMiles, cifrasSignificativas) {
    let numero = parseFloat(numeroTexto);
    if (isNaN(numero)) return "Número inválido";

    let numeroEnMillones = numero / 1_000_000;

    return F1_formatearNumeroCifrasSignificativas(
        numeroEnMillones.toString(),
        simboloDecimal,
        simboloMiles,
        cifrasSignificativas
    ) + "M";
}
*/

function F2_formatearNumeroCifrasSignificativasEnMillones(numeroTexto, simboloDecimal, simboloMiles, cifrasSignificativas) {
    if (typeof numeroTexto !== "string") return "Entrada inválida";

    let numero = Number(numeroTexto);
    if (isNaN(numero)) return "Número inválido";

    let numeroEnMillones = numero / 1_000_000;

    // Convertir a string sin notación exponencial
    let numeroStr = numeroEnMillones.toString();

    // Llamamos a F1 para formatear con cifras significativas
    let resultadoFormateado = F1_formatearNumeroCifrasSignificativas(
        numeroStr,
        simboloDecimal,
        simboloMiles,
        cifrasSignificativas
    );

    // Forzar eliminación de cualquier notación exponencial antes de agregar "M"
    resultadoFormateado = resultadoFormateado.replace(/e[+-]?\d+/i, '');

    return resultadoFormateado + "M";
}


function convertirExponencialADecimalString(num) {
    let str = String(num);
    if (str.includes('e') || str.includes('E')) {
        let fixed = Number(num).toFixed(20); // mucha precisión
        return fixed.replace(/\.?0+$/, ''); // quita ceros innecesarios
    }
    return str;
}



function F3_formatearEnteroConSeparadores(numeroTexto, simboloDecimal, simboloMiles, simboloMillones) {
    // Validar y convertir a número
    let numero = parseInt(numeroTexto, 10);
    if (isNaN(numero)) return "Número inválido";

    let numeroStr = numero.toString();
    let longitud = numeroStr.length;
    let resultado = '';
    let contador = 0;

    // Recorremos desde el final hacia el inicio para insertar los símbolos
    for (let i = longitud - 1; i >= 0; i--) {
        resultado = numeroStr[i] + resultado;
        contador++;

        // Inserta símbolo de miles cada 3 dígitos, excepto al final
        if (i > 0 && contador % 3 === 0) {
            if (contador % 6 === 0 && simboloMillones) {
                resultado = simboloMillones + resultado;
            } else {
                resultado = simboloMiles + resultado;
            }
        }
    }

    // Retornamos el número formateado (aunque no hay parte decimal, dejamos simboloDecimal como parámetro para compatibilidad futura)
    return resultado;
}


function F4_formatearNumeroCifrasSignificativasEnPorcentaje(numeroTexto, simboloDecimal, simboloMiles, cifrasSignificativas) {
    let numero = parseFloat(numeroTexto);
    if (isNaN(numero)) return "Número inválido";

    let numeroEnMillones = numero ;

    return F1_formatearNumeroCifrasSignificativas(
        numeroEnMillones.toString(),
        simboloDecimal,
        simboloMiles,
        cifrasSignificativas
    ) + "%";
}


function obtenerFechaHora() {
    const ahora = new Date();

    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const anio = ahora.getFullYear();

    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}