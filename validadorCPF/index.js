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

class validaCPF {
    constructor(cpfEnviado) {
        this._cpfEnviado = cpfEnviado.replace(/\D+/g, '')
    }

    get cpfEnviado(){
        return this._cpfEnviado
    }
 
    set cpfEnviado(valor) {
        this._cpfEnviado = valor
    }

    isSequencia() {
        return this._cpfEnviado.charAt(0).repeat(11) === this._cpfEnviado
    }

    geraNovoCPF() {
        const cpfParcial = this._cpfEnviado.slice(0, 9)

        const digito1 = validaCPF.geraDigito(cpfParcial)
        const digito2 = validaCPF.geraDigito(cpfParcial + digito1)
        this.novoCPF = cpfParcial + digito1 + digito2
    }

    static geraDigito(cpfParcial) {
        let total = 0
        let reverso = cpfParcial.length + 1

        for(let i of cpfParcial) {
            total += reverso * Number(i)
            reverso--
        }

       const digito = 11 - (total % 11)
       return digito <= 9 ? String(digito) : '0'
    }

    valida() {
        if(!this._cpfEnviado) return false
        if(typeof this._cpfEnviado !== 'string') return false;
        if(this._cpfEnviado.length !== 11) return false
        if(this.isSequencia()) return false
        this.geraNovoCPF()

        return this.novoCPF === this.cpfEnviado;
    }
}

const validaCP = new validaCPF('704.127.306-77')

console.log(validaCP.valida());


 