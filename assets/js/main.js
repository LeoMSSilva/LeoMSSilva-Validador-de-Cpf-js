function Cpf(cpf) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: () => cpf.replace(/\D+/g, '')
    });
}

Cpf.prototype.isSequence = function () {
    return this.cpfLimpo === this.cpfLimpo[0].repeat(this.cpfLimpo.length);
};

Cpf.prototype.criaDigito = (cpfParcial) => {
    const cpfArray = Array.from(cpfParcial);
    let tamanho = cpfArray.length + 1;
    let digito = cpfArray.reduce((a, v) => {
        a += Number(v)*tamanho;
        tamanho--;
        return a;
    }, 0);
    digito = 11 - digito % 11;
    return digito>9?'0':String(digito);
}

Cpf.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined' || this.cpfLimpo.length !== 11 || this.isSequence()) return false;
    let cpfParcial = this.cpfLimpo.slice(0,-2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    return (cpfParcial+digito1+digito2) === this.cpfLimpo;
}

document.addEventListener('submit', e => {
    e.preventDefault();
    const cpf1 = new Cpf(document.querySelector('#cpf').value);
    alert(`${cpf1.cpfLimpo} é um ${cpf1.valida()?'CPF válido':'CPF inválido'}`);
});