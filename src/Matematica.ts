function somar(n1: number, n2:number): number{
    return n1 + n2;
}

function subtrair(n1: number, n2:number): number{
    return n1 - n2;
}

function multiplicar(n1: number, n2:number): number{
    return n1 * n2;
}

module.exports.somar = somar;
module.exports.subtrair = subtrair;
module.exports.multiplicar = multiplicar;