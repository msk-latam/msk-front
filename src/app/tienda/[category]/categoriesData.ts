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
			'La anestesiología juega un papel crucial en la medicina moderna al tratar a pacientes con condiciones críticas y dolor severo. Este campo avanza rápidamente y requiere de constantes actualizaciones para garantizar un manejo adecuado y seguro del dolor y las técnicas anestésicas. Los <strong>cursos en anestesiología</strong> te permitirán capacitarte para brindar un cuidado de alta calidad y especializado, mejorando así la recuperación de los pacientes y su calidad de vida.',
	},
	cardiologia: {
		headerTitle: 'Cursos de cardiología',
		pageTitle: '¿Por qué capacitarte en cardiología?',
		pageDescription:
			'Los <strong>cursos de cardiología</strong> son fundamentales para enfrentar los desafíos que presentan las enfermedades cardiovasculares, una de las principales causas de mortalidad en adultos. Profundizar en esta especialidad te permitirá ofrecer un diagnóstico y tratamiento de calidad, optimizando la atención y el cuidado de los pacientes. A través de nuestros contenidos, adquirirás los conocimientos necesarios para mejorar los resultados en salud cardiovascular y reducir los riesgos asociados.',
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
			'Con los <strong>cursos en diabetes</strong> desarrollarás los conocimientos esenciales para manejar las complicaciones agudas y crónicas de la diabetes mellitus. Aprende desde un enfoque diagnóstico y terapéutico, utilizando herramientas y técnicas actualizadas para brindar una atención integral y efectiva a cada paciente, optimizando así su calidad de vida y el control de la enfermedad.',
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
	gastroenterologia: {
		headerTitle: 'Cursos de gastroenterología',
		pageTitle: '¿Por qué capacitarte sobre gastroenterología?',
		pageDescription:
			'Capacitarse en gastroenterología es esencial para los profesionales de la salud que buscan un manejo efectivo de los trastornos del aparato digestivo. Nuestros <strong>cursos en gastroenterología</strong> te dotarán de las herramientas necesarias para identificar, diagnosticar y tratar de manera eficaz las enfermedades gastrointestinales más comunes, así como para prevenir y manejar sus complicaciones más frecuentes.',
	},
	geriatria: {
		headerTitle: 'Cursos de geriatría',
		pageTitle: '¿Qué obtienes al estudiar sobre geriatría?',
		pageDescription:
			'Frente al envejecimiento poblacional, la especialidad de geriatría se vuelve cada vez más relevante. Tomar <strong>cursos de geriatría</strong> te proporcionará los conocimientos y las herramientas más actualizadas para mejorar la calidad asistencial y satisfacer las necesidades de atención personalizada del adulto mayor, preparándote para enfrentar los desafíos de un envejecimiento saludable y activo.',
	},
	ginecologia: {
		headerTitle: 'Cursos de ginecología',
		pageTitle: '¿Por qué aprender sobre ginecología?',
		pageDescription:
			'Los <strong>cursos de ginecología</strong> te permitirán adquirir las habilidades necesarias para un diagnóstico rápido y preciso, así como para el tratamiento adecuado de las infecciones ginecológicas prevalentes. Nuestras capacitaciones te brindan el conocimiento esencial para abordar las condiciones ginecológicas comunes y desarrollar un enfoque terapéutico efectivo y basado en la evidencia.',
	},
	hematologia: {
		headerTitle: 'Cursos de hematología',
		pageTitle: '¿Qué aprenderás sobre hematología?',
		pageDescription:
			'Estudiar hematología te proporcionará una comprensión profunda de los diversos tipos de anemia, síndromes mielodisplásicos, leucemias y linfomas. Nuestros <strong>cursos de hematología</strong> te brindarán las herramientas necesarias para entender los mecanismos fisiopatológicos de las enfermedades hematológicas y mejorar la atención y el tratamiento de los pacientes con trastornos sanguíneos complejos.',
	},
	infectologia: {
		headerTitle: 'Cursos de infectología',
		pageTitle: '¿Quieres capacitarte en infectología?',
		pageDescription:
			'La infectología es una especialidad médica que se enfoca en la prevención, el diagnóstico y el tratamiento de enfermedades infecciosas, como bacterias, virus, hongos y parásitos. En un mundo globalizado donde las enfermedades emergentes y la resistencia a los antimicrobianos son desafíos constantes, tomar <strong>cursos de infectología</strong> es esencial para garantizar una atención médica efectiva y oportuna.',
	},
	'medicina-familiar': {
		headerTitle: 'Cursos de medicina familiar y comunitaria',
		pageTitle: '¿Por qué es importante la medicina familiar?',
		pageDescription:
			'La medicina familiar es una disciplina clave para la atención integral de pacientes a lo largo de todas las etapas de la vida. Se centra en la prevención, el diagnóstico y el tratamiento de enfermedades comunes, así como en el manejo continuo de la salud en el contexto familiar y comunitario. Una capacitación sólida con nuestros <strong>cursos de medicina familiar</strong> te permitirá brindar un cuidado holístico y personalizado.',
	},
	'medicina-general': {
		headerTitle: 'Cursos de medicina general',
		pageTitle: '¿Qué es la medicina general?',
		pageDescription:
			'La medicina general es la base de la atención médica, ya que aborda una amplia variedad de enfermedades y condiciones que afectan a pacientes de todas las edades. Tomar <strong>cursos de medicina general</strong> es esencial, ya que el personal médico generalista es el primer punto de contacto en el sistema de salud, lo que les lleva a desempeñar un papel crucial en el diagnóstico temprano, el tratamiento y la derivación especializada.',
	},
	'medicina-intensiva': {
		headerTitle: 'Cursos de medicina intensiva',
		pageTitle: '¿Por qué capacitarte en medicina intensiva?',
		pageDescription:
			'En los <strong>cursos de medicina</strong> intensiva se estudia el manejo de pacientes críticos que requieren monitoreo y tratamiento avanzado en unidades de cuidados intensivos. Es una especialidad fundamental para salvar vidas en situaciones complejas, como fallas orgánicas múltiples, infecciones graves o postoperatorios delicados.',
	},
	'medicina-de-urgencias': {
		headerTitle: 'Cursos de medicina de urgencias',
		pageTitle: '¿Quieres capacitarte en medicina de urgencias?',
		pageDescription:
			'Tienes distintas opciones para cursar a distancia. Con ellas desarrollarás las habilidades esenciales para poner en práctica en los servicios de urgencias y emergencias. Comprenderás en profundidad un amplio rango de enfermedades, incluso aquellas poco frecuentes, y te prepararás para una correcta toma de decisiones que derive en tratamientos más eficientes.',
	},
	nefrologia: {
		headerTitle: 'Cursos de nefrología',
		pageTitle: '¿Qué obtienes al aprender sobre nefrología?',
		pageDescription:
			'La nefrología estudia y trata las enfermedades que afectan a los riñones, órganos vitales para la regulación de líquidos y electrolitos, y para la eliminación de desechos del cuerpo. Con el aumento de patologías como la enfermedad renal crónica y la hipertensión, tomar <strong>cursos de nefrología</strong> es crucial para ofrecer una atención de calidad.',
	},
	neurologia: {
		headerTitle: 'Cursos de neurología',
		pageTitle: '¿Qué aprenderás sobre neurología?',
		pageDescription:
			'La neurología se dedica al estudio y tratamiento de los trastornos del sistema nervioso, que incluye el cerebro, la médula espinal y los nervios periféricos. Dada la creciente prevalencia de enfermedades como el Alzheimer, los accidentes cerebrovasculares y la epilepsia, los cursos en neurología se vuelven esenciales para abordar estos desafíos de salud pública.',
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
			'La nutrición es la ciencia que estudia la relación entre los alimentos y la salud, considerando factores fisiológicos, metabólicos y culturales. En un contexto donde las enfermedades relacionadas con la alimentación, como la obesidad y la diabetes, están en aumento, los <strong>cursos de nutrición</strong> permiten a los profesionales mejorar la calidad de vida de las personas.',
	},
	obstetricia: {
		headerTitle: 'Cursos de obstetricia',
		pageTitle: '¿Qué aprenderás sobre obstetricia?',
		pageDescription:
			'Los <strong>cursos de obstetricia</strong> se centran en el cuidado de la mujer durante el embarazo, parto y puerperio, asegurando el bienestar tanto de la madre como del bebé. Es una disciplina clave para reducir riesgos y garantizar nacimientos saludables, lo que la convierte en una especialidad fundamental en la medicina.',
	},
	oftalmologia: {
		headerTitle: 'Cursos de oftalmología',
		pageTitle: '¿Qué puedes aprender sobre oftalmología?',
		pageDescription:
			'Capacitándote a través de contenido elaborado, revisado y actualizado por profesionales de reconocido prestigio, podrás conocer las bases anatómicas y funcionales del aparato de la visión y los principios de la óptica y la refracción, así como estudiar el abordaje de patologías de la especialidad, tales como ametropía, conjuntivitis, catarata, glaucoma, retinopatías y traumatología ocular, entre otras.',
	},
	oncologia: {
		headerTitle: 'Cursos de oncología',
		pageTitle: '¿Por qué capacitarte en oncología?',
		pageDescription:
			'La oncología aborda el diagnóstico, el tratamiento y el seguimiento del cáncer, una de las principales causas de muerte en el mundo. Dado el avance constante en terapias y tecnologías, tomar <strong>cursos de oncología</strong> es imprescindible para ofrecer tratamientos efectivos y humanizados.',
	},
	pediatria: {
		headerTitle: 'Cursos de pediatría',
		pageTitle: '¿Qué obtienes al aprender sobre pediatría?',
		pageDescription:
			'La pediatría se ocupa de la salud y el bienestar de niños y adolescentes, desde su nacimiento hasta la adolescencia. Esta especialidad es esencial para garantizar un desarrollo físico, mental y emocional saludable, abordando en los <strong>cursos de pediatría</strong> tanto enfermedades comunes como necesidades específicas de esta población.',
	},
	psiquiatria: {
		headerTitle: 'Cursos de psiquiatría',
		pageTitle: '¿Quieres capacitarte en psiquiatría?',
		pageDescription:
			'La psiquiatría se centra en el diagnóstico, el tratamiento y la prevención de trastornos mentales, emocionales y conductuales. Con el creciente reconocimiento de la importancia de la salud mental, los <strong>cursos de psiquiatría</strong> te permitirán brindar un apoyo vital a tus pacientes.',
	},
	'radiologia-e-imagenologia': {
		headerTitle: 'Cursos de radiología',
		pageTitle: '¿Qué aprenderás sobre radiología?',
		pageDescription:
			'La radiología e imagenología son herramientas médicas fundamentales para el diagnóstico y monitoreo de enfermedades a través de técnicas avanzadas como rayos X, tomografías y resonancias magnéticas. Capacitarte en <strong>cursos de radiología</strong> te garantiza un dominio técnico y clínico que mejora tu atención al paciente.',
	},
	traumatologia: {
		headerTitle: 'Cursos de traumatología',
		pageTitle: '¿Qué consigues al estudiar sobre traumatología?',
		pageDescription:
			'La traumatología se ocupa del diagnóstico y el tratamiento de lesiones del sistema musculoesquelético, como fracturas, luxaciones y problemas articulares. Es una especialidad crucial en accidentes y lesiones deportivas, sobre la que podrás capacitarte en profundidad con nuestros <strong>cursos de traumatología</strong>, preparándote para asegurar una recuperación funcional óptima a tus pacientes.',
	},

	urologia: {
		headerTitle: 'Cursos de urología',
		pageTitle: '¿Quieres capacitarte en urología?',
		pageDescription:
			'La urología se enfoca en el estudio, el diagnóstico y el tratamiento de enfermedades del sistema urinario y del aparato reproductor masculino. Con el aumento de condiciones como las infecciones urinarias y el cáncer de próstata, los <strong>cursos de urología</strong> se vuelven claves para mejorar la calidad de vida de los pacientes.',
	},
	'': {
		headerTitle: '',
		pageTitle: '',
		pageDescription: '',
	},
};
