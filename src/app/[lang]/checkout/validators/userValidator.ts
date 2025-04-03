const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validateUserField = (field: string, value: string | boolean) => {
	switch (field) {
		case 'firstName':
			return value.toString().trim() ? '' : 'El nombre es obligatorio.';
		case 'lastName':
			return value.toString().trim() ? '' : 'El apellido es obligatorio.';
		case 'email':
			return validateEmail(value.toString()) ? '' : 'El correo electrónico no es válido.';
		case 'phone':
			return value.toString().trim() ? '' : 'El teléfono es obligatorio.';
		case 'birthday': {
			if (!value.toString().trim()) {
				return 'La fecha de nacimiento es obligatoria.';
			}
			const selectedDate = new Date(value.toString());
			const today = new Date();
			if (selectedDate > today) {
				return 'La fecha de nacimiento no puede ser en el futuro.';
			}
			return '';
		}
		case 'profession':
			return value.toString() ? '' : 'Debe seleccionar una profesión.';
		case 'specialty':
			return value.toString() ? '' : 'Debe seleccionar una especialidad.';
		case 'privacyPolicy':
			return value ? '' : 'Debe aceptar las condiciones de privacidad.';
		default:
			return '';
	}
};
