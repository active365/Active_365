function laCajaDePandora(numero){
    if(numero % 2 == 0){
        return  console.log(numero.toString(2) + " es par");
    }
    if(numero % 2 == 1){
     return console.log(numero.toString(16) + " es impar");
    }
}

laCajaDePandora(10);
laCajaDePandora(11);

function Frank(){
    console.log({
        nombre: "Frank",
        edad: 24,
        nacionalidad: "Argentino",
        ciudad: "Buenos Aires"
    });
}

Frank();

