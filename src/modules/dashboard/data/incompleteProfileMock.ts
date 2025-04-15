// Sample mock data with missing fields to test incomplete profile UI
const incompleteUserData = {
	profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
	name: 'Guillermina Elizabeth Hernandez Gutierrez',
	specialty: '', // Missing specialty
	details: [
		{
			label: 'Profesión',
			value: '', // Missing profession
			placeholder: 'Completar profesión',
		},
		{
			label: 'Email',
			value: 'guillehg@gmail.com',
		},
		{
			label: 'País',
			value: '', // Missing country
			placeholder: 'Completar país',
		},
		{
			label: 'Teléfono',
			value: '', // Missing phone
			placeholder: 'Completar número telefónico',
		},
	],
	interests: [], // Empty interests array
	profileCompletion: {
		percentage: 50,
		message: '¿Por qué completar tu perfil?',
		ctaLink: '#',
		ctaText: 'Entérate aquí',
	},
	// Rest of the mock data (copying from the complete user data)
	currentCourse: {
		image:
			'https://images.ctfassets.net/cnu0m8re1exe/KARd6CSmh3yD656fzK3Kl/d46556b481191e9a679ed0e02388788f/doctor-and-patient.jpg?fm=jpg&fl=progressive&w=1140&h=700&fit=fill',
		label: 'Continúa tu aprendizaje',
		title: 'Curso superior de medicina legal y forense',
		progress: '25%',
	},
	actionCards: [
		{
			iconName: 'DocumentIcon',
			title: 'Mis facturas',
			description: 'Encuentra y descarga tus facturas',
		},
		{
			iconName: 'UserIcon',
			title: 'Mi cuenta',
			description: 'Gestiona todo lo relacionado con tus datos personales',
		},
	],
	icons: {
		edit: 'EditIcon',
		arrowRight: 'ArrowRight',
		plus: 'PlusIcon',
	},
};

export { incompleteUserData };
