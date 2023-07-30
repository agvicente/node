export function somar(n1: number, n2:number): number{
    return n1 + n2;
}

export function subtrair(n1: number, n2:number): number{
    return n1 - n2;
}

function multiplicar(n1: number, n2:number): number{
    return n1 * n2;
}


export default {
    somar,
    subtrair,
    multiplicar
}