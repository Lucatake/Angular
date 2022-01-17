var minhaVar = 'minha variavel';

function minhaFunc(x, y) {
    return x + y;
}

//ES6 ou ES2015
let num = 2;
var PI = 3.14;

var numeros = [1, 2, 3]
numeros.map(function(valor){
    return valor * 2;
});

numeros.map(valor => valor * 2); //ES6 ou ES2015

class Matematica {
    soma(x, y){
        return x + y;
    }
}

//Variáveis tipadas
var n1: any = 'string';
n1 = 4;

