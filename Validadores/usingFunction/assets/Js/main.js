// 705.484.450-52 - 070.987.720-03

/*
7x 0x 5x 4x 8x 4x 4x 5x 0x
10 9  8  7  6  5  4  3  2x
70 0  40 25 42 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)

7x 0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10 9  8  7  6  5  4  3  2 
77 0  45 32 56 24 20 20 0  10

11 - (284 % 11) = 2 (Segundo dígito)
*/


function validaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfEnviado', {
      enumerable: true,
      get: function(){ 
        return cpfEnviado.replace(/\D+/g, '')
      }
    })
}

validaCPF.prototype.valida = function(){
    if(typeof this.cpfEnviado === 'undefined') return false
    if(this.cpfEnviado.length !== 11 ) return false
    if(this.isSequencia()) return false

    const cpfParcial = this.cpfEnviado.slice(0, 9)
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2

    return novoCpf === this.cpfEnviado
}

validaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial)
    let regressivo = cpfArray.length + 1
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val))
        regressivo --
        return ac
    }, 0)

    const digito = 11 - (total % 11)
    return digito > 9 ? '0' : String(digito)
}

validaCPF.prototype.isSequencia = function(){
    const sequencia =  this.cpfEnviado[0].repeat(this.cpfEnviado.length) 
    return sequencia === this.cpfEnviado
}

const cpf = new validaCPF('704.127.306-77')
console.log(cpf.valida())