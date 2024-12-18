interface CategoryInfo {
	headerTitle: string;
	pageTitle: string;
	pageDescription: string;
}

interface CategoriesData {
	[key: string]: CategoryInfo;
}

export const categoriesData: CategoriesData = {
	'administracion-y-gestion': {
		headerTitle: 'Cursos de administración y gestión',
		pageTitle: '¿Por qué aprender sobre administración y gestión?',
		pageDescription:
			'Los <strong>cursos en administración y gestión</strong> son esenciales para los profesionales de la salud en un entorno cada vez más complejo y dinámico. Prepárate para implementar estrategias efectivas que optimicen los procesos y mejoren las operaciones dentro de las instituciones de salud. Adquiere habilidades clave para posicionarte como líder en la gestión de servicios de salud, ayudando a las organizaciones a ofrecer soluciones innovadoras y eficientes.',
	},
	'anestesiologia-y-dolor': {
		headerTitle: 'Cursos de anestesiología',
		pageTitle: '¿Cuál es la importancia de la anestesiología?',
		pageDescription:
			'La anestesiología juega un papel crucial en la medicina moderna al tratar a pacientes con condiciones críticas y dolor severo. Este campo avanza rápidamente y requiere de constantes actualizaciones para garantizar un manejo adecuado y seguro del dolor y las técnicas anestésicas. Los <strong>cursos en anestesiología</strong> te permitirán brindar un cuidado de alta calidad y especializado, mejorando así la recuperación de los pacientes y su calidad de vida.',
	},
	cardiologia: {
		headerTitle: 'Cursos de cardiología',
		pageTitle: '¿Por qué capacitarte en cardiología?',
		pageDescription:
			'Los <strong>cursos de cardiología</strong> son fundamentales para enfrentar los desafíos que presentan las enfermedades cardiovasculares, una de las principales causas de mortalidad en adultos. Profundizar en esta especialidad te permitirá ofrecer un diagnóstico y tratamiento de calidad, optimizando la atención y cuidado de los pacientes. A través de nuestros contenidos, adquirirás los conocimientos necesarios para mejorar los resultados en salud cardiovascular y reducir los riesgos asociados. ',
	},
	cirugia: {
		headerTitle: 'Cursos de cirugía',
		pageTitle: '¿Qué obtienes al estudiar sobre cirugía?',
		pageDescription:
			'Los <strong>cursos de cirugía</strong> te ofrecen una comprensión integral de un amplio espectro de intervenciones quirúrgicas, tanto programadas como de urgencia. Esta especialidad abarca desde procedimientos en el aparato digestivo y las paredes abdominales hasta cirugías en cabeza y cuello, alteraciones en el sistema endocrino y tratamientos en la piel. Nuestros contenidos te prepararán para enfrentar los desafíos quirúrgicos más complejos y mejorar la calidad de la atención que brindas a tus pacientes.',
	},
	dermatologia: {
		headerTitle: 'Cursos de dermatología',
		pageTitle: '¿Qué puedes aprender sobre dermatología?',
		pageDescription:
			'Con nuestros <strong>cursos de dermatología</strong> podrás realizar un abordaje clínico-dermatológico efectivo y preciso para tus pacientes. Con un enfoque práctico y actualizado de las diversas patologías dermatológicas, podrás perfeccionar y actualizar tus habilidades para el diagnóstico y tratamiento de condiciones cutáneas comunes y complejas.',
	},
	diabetes: {
		headerTitle: 'Cursos de diabetes',
		pageTitle: '¿Qué puedes aprender sobre diabetes?',
		pageDescription:
			'Con los <strong>cursos en diabetes</strong> desarrollarás los conocimientos esenciales para manejar las complicaciones agudas y crónicas de la diabetes mellitus. Estudia desde un enfoque diagnóstico y terapéutico, utilizando herramientas y técnicas actualizadas para brindar una atención integral y efectiva a cada paciente, optimizando así su calidad de vida y control de la enfermedad.',
	},
	emergentologia: {
		headerTitle: 'Cursos de emergentología',
		pageTitle: '¿Quieres capacitarte en emergentología?',
		pageDescription:
			'A través de nuestros <strong>cursos en emergentología</strong>, desarrollarás las habilidades necesarias para actuar rápidamente en los servicios de urgencias y emergencias. Aprenderás a manejar un amplio rango de enfermedades, desde las más comunes hasta las menos frecuentes, y te prepararás para tomar decisiones efectivas que mejoren los tratamientos y la atención de los pacientes en situaciones críticas.',
	},
	endocrinologia: {
		headerTitle: 'Cursos de endocrinología',
		pageTitle: '¿Cuál es la importancia de la endocrinología?',
		pageDescription:
			'La endocrinología es fundamental para abordar las enfermedades metabólicas y las complicaciones derivadas del proceso nutricional a lo largo de la vida del paciente. Con nuestros <strong>cursos en endocrinología</strong>, te prepararás para atender de manera integral las variadas patologías que afectan al sistema endocrino, mejorando así la calidad de la atención que proporcionas a tus pacientes y su bienestar general.',
	},
	geriatria: {
		headerTitle: 'Cursos de geriatría',
		pageTitle: '¿Qué obtienes al estudiar sobre geriatría?',
		pageDescription:
			'Frente al envejecimiento poblacional, la especialidad de geriatría se vuelve cada vez más relevante. Tomar <strong>cursos de geriatría</strong> te proporcionará los conocimientos y las herramientas más actualizadas para mejorar la calidad asistencial y satisfacer las necesidades de atención personalizada del adulto mayor, preparando así al personal de salud para enfrentar los desafíos de un envejecimiento saludable y activo.',
	},
	ginecologia: {
		headerTitle: 'Cursos de ginecología',
		pageTitle: '¿Por qué aprender sobre ginecología?',
		pageDescription:
			'Los <strong>cursos de ginecología</strong> te permitirán adquirir las habilidades necesarias para un diagnóstico rápido y preciso, así como para el tratamiento adecuado de las infecciones ginecológicas prevalentes. Nuestras formaciones te brindan el conocimiento esencial para abordar las condiciones ginecológicas comunes y desarrollar un enfoque terapéutico efectivo y basado en la evidencia.',
	},
	hematologia: {
		headerTitle: 'Cursos de hematología',
		pageTitle: '¿Qué aprenderás sobre hematología?',
		pageDescription:
			'Estudiar hematología te proporcionará una comprensión profunda de los diversos tipos de anemia, síndromes mielodisplásicos, leucemias y linfomas. Nuestros <strong>cursos de hematología</strong> te equiparán con las herramientas necesarias para entender los mecanismos fisiopatológicos de las enfermedades hematológicas y mejorar la atención y tratamiento de los pacientes con trastornos sanguíneos complejos.',
	},
	infectologia: {
		headerTitle: 'Cursos de infectología',
		pageTitle: '¿Quieres capacitarte en infectología?',
		pageDescription:
			'¡Haces bien! Es el momento ideal para comenzar, debido a que el panorama de alta prevalencia de enfermedades transmisibles requiere de profesionales óptimamente preparados para el abordaje de estas afecciones. Aprende sobre infectología en MSK y adquiere conocimientos para la atención eficaz de patologías por agentes infecciosos y para establecer terapias racionales para cada paciente.',
	},
	'medicina-de-urgencias': {
		headerTitle: 'Cursos de medicina de urgencias',
		pageTitle: '¿Quieres capacitarte en medicina de urgencias?',
		pageDescription:
			'Tienes distintas opciones para cursar a distancia. Con ellas desarrollarás las habilidades esenciales para poner en práctica en los servicios de urgencias y emergencias. Comprenderás en profundidad un amplio rango de enfermedades, incluso aquellas poco frecuentes, y te prepararás para una correcta toma de decisiones que derive en tratamientos más eficientes.',
	},
	'medicina-familiar': {
		headerTitle: 'Cursos de medicina familiar y comunitaria',
		pageTitle: '¿Por qué es importante la medicina familiar?',
		pageDescription:
			'Esta especialidad tiene incidencia específica en el nivel de salud de las personas, las familias y la comunidad en general. Si te capacitas en medicina familiar y comunitaria, te estarás preparando para resolver la mayoría de los problemas de salud que presenta la población y coordinar los distintos niveles de atención, permitiendo así el buen funcionamiento de todo el sistema hospitalario.',
	},
	'medicina-general': {
		headerTitle: 'Cursos de medicina general',
		pageTitle: '¿Qué es la medicina general?',
		pageDescription:
			'Consta de una rama fundamental de conocimientos para todo el personal de la salud, ya que permite diagnosticar y tratar una amplia gama de enfermedades comunes en pacientes de todas las edades. Además, proporciona las habilidades necesarias para ofrecer una atención integral, promover la salud y gestionar enfermedades crónicas, contribuyendo así a la salud global de la comunidad.',
	},
	'medicina-intensiva': {
		headerTitle: 'Cursos de medicina intensiva',
		pageTitle: '¿Por qué capacitarte en medicina intensiva?',
		pageDescription:
			'La atención de aquellos pacientes con alteraciones fisiopatológicas que ponen en peligro la vida es uno de los contextos más desafiantes en el ámbito de la salud. Por este motivo, es clave tu preparación para realizar un abordaje eficaz del paciente crítico, con un criterio sólido para la toma de decisiones complejas en situaciones de gran presión.',
	},
	neurologia: {
		headerTitle: 'Cursos de neurología',
		pageTitle: '¿Qué aprenderás sobre neurología?',
		pageDescription:
			'Comprenderás el desarrollo, la estructura y la función del sistema nervioso (central, periférico y autónomo) en estado normal y patológico. Desarrollarás conocimientos sobre la semiología en el diagnóstico clínico y las múltiples técnicas clínicas e instrumentales de estudio y diagnóstico actualmente en uso.',
	},
	neumonologia: {
		headerTitle: 'Cursos de neumología',
		pageTitle: '¿Qué obtienes al estudiar sobre neumología?',
		pageDescription:
			'Accedes a conocimientos desarrollados por un comité de expertos médicos en los que se expone desde la embriología, pasando por la anatomía, hasta la fisiología del aparato respiratorio. Los avances acontecidos en el contexto de esta especialidad hacen necesaria una continua actualización al respecto.',
	},
	nutricion: {
		headerTitle: 'Cursos de nutrición',
		pageTitle: '¿Por qué hacer un curso de nutrición?',
		pageDescription:
			'La alimentación correcta es uno de los pilares de la salud a nivel biopsicosocial. Por este motivo, tiene una relevancia fundamental y motiva la necesidad de contar con profesionales altamente capacitados en el manejo nutricional de los pacientes. Aprende ahora 100% a distancia y actualízate en esta ciencia que interactúa de manera interdisciplinaria con todas las especialidades clínicas y quirúrgicas.',
	},
	obstetricia: {
		headerTitle: 'Cursos de obstetricia',
		pageTitle: '¿Qué aprenderás sobre obstetricia?',
		pageDescription:
			'Mediante un enfoque práctico, interdisciplinario, académicamente riguroso y actualizado, obtendrás conocimientos y competencias para acompañar el embarazo y el puerperio brindando siempre un seguimiento atento de los controles prenatales, la sintomatología, los tratamientos y las medidas de prevención de posibles complicaciones en cada etapa del proceso.',
	},
	oncologia: {
		headerTitle: 'Cursos de oncología',
		pageTitle: '¿Por qué capacitarte en oncología?',
		pageDescription:
			'Los avances en este ámbito demandan tu actualización. En este contexto, puedes aprender sobre la epidemiología de los principales tipos de cáncer, sus bases genéticas, los métodos de diagnóstico y estadificación, el manejo de los tumores según su evolución y los diversos recursos terapéuticos aplicables.',
	},
	pediatria: {
		headerTitle: 'Cursos de pediatría',
		pageTitle: '¿Qué obtienes al aprender sobre pediatría?',
		pageDescription:
			'Con cursos desarrollados por expertos en la especialidad, accedes a los más amplios conocimientos para responder de forma efectiva al desafío que representa la atención pediátrica, desde el nacimiento hasta la adolescencia. Estudia en profundidad las complicaciones, patologías y alteraciones que puede sufris el paciente pediátrico.',
	},
	psiquiatria: {
		headerTitle: 'Cursos de psiquiatría',
		pageTitle: '¿Quieres capacitarte en psiquiatría?',
		pageDescription:
			'Nuestra propuesta de aprendizaje en esta especialidad se basa en un enfoque práctico, muy útil para la puesta al día y mejora de los conocimientos y las herramientas relacionadas con trastornos afectivos, esquizofrenia y trastornos de personalidad, así como también para la actualización sobre el uso clínico de algunos fármacos.',
	},
	'radiologia-e-imagenologia': {
		headerTitle: 'Cursos de radiología',
		pageTitle: '¿Qué aprenderás sobre radiología?',
		pageDescription:
			'Prepárate para adquirir un conocimiento integral de esta especialidad y sus aplicaciones. A través de material teórico y audiovisual, estudiarás las bases de la técnica y sus diferentes modalidades, hasta los aspectos fundamentales de las radiologías torácica y cardíaca, abdominal, mamaria, osteomolecular, entre otras.',
	},
	traumatologia: {
		headerTitle: 'Cursos de traumatología',
		pageTitle: '¿Qué consigues al estudiar sobre traumatología?',
		pageDescription:
			'Hazte de las competencias y las habilidades necesarias para realizar de manera oportuna y eficaz el abordaje, la evaluación inicial, el diagnóstico y los diferentes tipos de tratamientos de la patología traumatológica en el paciente adulto, infantil y oncológico. Estudia las afecciones traumatológicas en su totalidad: miembro superior y miembro inferior, la columna, la pelvis y el pie.',
	},

	gastroenterologia: {
		headerTitle: 'Cursos de gastroenterología',
		pageTitle: '¿Por qué capacitarte sobre gastroenterología?',
		pageDescription:
			'Los cursos de actualización en gastroenterología se han posicionado como una herramienta imprescindible en el ámbito de la salud. Capacitándote en esta especialidad, podrás contar con las herramientas y los conocimientos clave para identificar, realizar el diagnóstico diferencial e implementar el tratamiento adecuado de los trastornos más comunes del aparato digestivo y ser capaz de prevenir y tratar las complicaciones más frecuentes de sus distintas enfermedades.',
	},
	nefrologia: {
		headerTitle: 'Cursos de nefrología',
		pageTitle: '¿Qué obtienes al aprender sobre nefrología?',
		pageDescription:
			'Hazte de las competencias necesarias para atender de forma integral, tanto ambulatoria como hospitalaria, las variadas patologías que corresponden a la especialidad a lo largo de toda la vida del paciente. Con una capacitación en nefrología podrás estudiar la estructura y la función de los riñones, tanto en la salud como en la enfermedad, incluyendo la prevención, el diagnóstico y el tratamiento de las enfermedades renales.',
	},
	oftalmologia: {
		headerTitle: 'Cursos de oftalmología',
		pageTitle: '¿Qué puedes aprender sobre oftalmología?',
		pageDescription:
			'Capacitándote a través de contenido elaborado, revisado y actualizado por profesionales de reconocido prestigio, podrás conocer las bases anatómicas y funcionales del aparato de la visión y los principios de la óptica y la refracción, así como estudiar el abordaje de patologías de la especialidad, tales como ametropía, conjuntivitis, catarata, glaucoma, retinopatías y traumatología ocular, entre otras.',
	},
	urologia: {
		headerTitle: 'Cursos de urología',
		pageTitle: '¿Quieres capacitarte en urología?',
		pageDescription:
			'Nuestra propuesta de aprendizaje en esta especialidad está sustentada por la experiencia de autores de prestigio en el ámbito académico. Capacítate para conocer en profundidad las afecciones del aparato urinario y órganos situados en el retroperitoneo, así como del aparato genital masculino, motivadas por alteraciones congénitas, traumáticas, sépticas, metabólicas, obstructivas u oncológicas.',
	},
	'': {
		headerTitle: '',
		pageTitle: '',
		pageDescription: '',
	},
};
