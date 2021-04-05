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
        a += Number(v) * tamanho;
        tamanho--;
        return a;
    }, 0);
    digito = 11 - digito % 11;
    return digito > 9 ? '0' : String(digito);
}

Cpf.prototype.valida = function () {
    if (typeof this.cpfLimpo === 'undefined' || this.cpfLimpo.length !== 11 || this.isSequence()) return false;
    let cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    return (cpfParcial + digito1 + digito2) === this.cpfLimpo;
}

Cpf.prototype.formataCpf = function (cpf) {
    cpf += '00000000000';
    return (
        cpf.slice(0, 3) + '.' +
        cpf.slice(3, 6) + '.' +
        cpf.slice(6, 9) + '-' +
        cpf.slice(9, 11)
    );
}

document.addEventListener('submit', e => {
    e.preventDefault();
    const cpf = document.querySelector('#cpf');
    const cpf1 = new Cpf(cpf.value);
    const cpfLimpo = cpf1.formataCpf(cpf1.cpfLimpo);
    cpf.value = cpfLimpo;
    cpf1.valida()?cpf.style.color = '#00ff00':cpf.style.color = '#ff0000';
    setTimeout(() => alert(`${cpfLimpo} ${cpf1.valida()?'é um CPF válido':'é um CPF inválido'}`), 1);
});