const form = document.querySelector('#form');

function Cpf(cpf) {
	Object.defineProperty(this, 'cleanedCpf', {
		enumerable: true,
		get: () => cpf.replace(/\D+/g, ''),
	});
}

Cpf.prototype.isSequence = () => {
	return this.cleanedCpf === this.cleanedCpf[0].repeat(this.cleanedCpf.length);
};

Cpf.prototype.createDigit = (partialCpf) => {
	const cpfArray = Array.from(partialCpf);
	let length = cpfArray.length + 1;
	let digit = cpfArray.reduce((a, v) => {
		a += Number(v) * length;
		length--;
		return a;
	}, 0);
	digit = 11 - (digit % 11);
	return digit > 9 ? '0' : String(digit);
};

Cpf.prototype.validate = () => {
	if (
		typeof this.cleanedCpf === 'undefined' ||
		this.cleanedCpf.length !== 11 ||
		this.isSequence()
	) {
		return false;
	}
	let partialCpf = this.cleanedCpf.slice(0, -2);
	const digitOne = this.createDigit(partialCpf);
	const digitTwo = this.createDigit(partialCpf + digitOne);
	return partialCpf + digitOne + digitTwo === this.cleanedCpf;
};

Cpf.prototype.formatCpf = (cpf) => {
	if (cpf.length < 11) {
		cpf += '0'.repeat(11);
	}
	cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
	return cpf.slice(0, 14);
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const cpfElement = document.querySelector('#cpf');
	const cpfObject = new Cpf(cpfElement.value);
	const cleanedCpf = cpfObject.formatCpf(cpfElement.value);
	cpfElement.value = cleanedCpf;
	cpfElement.style.color = cpfObject.validate() ? '#00ff00' : '#ff0000';

	alert(
		`${cleanedCpf} ${
			cpfObject.validate() ? 'é um CPF válido' : 'é um CPF inválido'
		}`,
	);
});
