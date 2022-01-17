var minhaVar = 'minha variavel';
function minhaFunc(x, y) {
    return x + y;
}
//ES6 ou ES2015
var num = 2;
var PI = 3.14;
var numeros = [1, 2, 3];
numeros.map(function (valor) {
    return valor * 2;
});
numeros.map(function (valor) { return valor * 2; }); //ES6 ou ES2015
var Matematica = /** @class */ (function () {
    function Matematica() {
    }
    Matematica.prototype.soma = function (x, y) {
        return x + y;
    };
    return Matematica;
}());
//Variáveis tipadas
var n1 = 'string';
n1 = 4;
