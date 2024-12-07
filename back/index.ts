function laCajaDePandora(numero){
    if (numero % 2 === 0) {
        return numero.toString(2);
    } else {
        return numero.toString(16);
    }
}

function Diana() {
    return {
        nombre: "Diana",
        edad: 29,
        nacionalidad: "Colombiana"
    };
}