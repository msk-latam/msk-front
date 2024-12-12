export const validatePaymentField = (field: string, value: string | boolean): string => {
	switch (field) {
		case 'cardholderName':
			return value.toString().trim() ? '' : 'El nombre completo es obligatorio.';
		case 'cardNumber':
			return value.toString().trim() ? '' : 'El número de tarjeta es obligatorio.';
		case 'expiryMonth':
			return value.toString() ? '' : 'Introduzca un mes válido.';
		case 'expiryYear':
			return value.toString() ? '' : 'Introduzca un año válido.';
		case 'cvv':
			return value.toString() ? '' : 'Introduzca un número válido.';
		case 'idType':
			return value ? '' : 'Seleccione un tipo de documento.';
		case 'documentNumber':
			return value ? '' : 'Ingrese un número válido.';
		case 'country':
			return value ? '' : 'Ingrese un país.';
		case 'state':
			return value ? '' : 'Ingrese una provincia o estado.';
		case 'city':
			return value ? '' : 'Ingrese una ciudad.';
		case 'address': // Nota: arreglé el typo en "address"
			return value ? '' : 'Ingrese su dirección.';
		case 'postalCode':
			return value ? '' : 'Ingrese su código postal.';
		default:
			return '';
	}
};
