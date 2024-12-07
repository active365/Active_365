function CajaDePandora(numero) {
    // Verificar si el número es par
    if (numero % 2 === 0) {
        return numero.toString(2); // Convertir a binario
    } else {
        return `El número ${numero} no es par.`;
    }
}
console.log(CajaDePandora(10));