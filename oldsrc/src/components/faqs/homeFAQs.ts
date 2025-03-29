interface FAQItem {
	titulo: string;
	parrafo: string;
}

interface FAQs {
	texto: string;
	items: FAQItem[];
}

export const homeFAQs = (country: string) => {
	const faqs: FAQs = {
		texto: 'Preguntas frecuentes',
		items: [],
	};

	switch (country) {
		case 'ar':
			faqs.items = [
				{
					titulo: '¿Cómo funciona MSK?',
					parrafo: `<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>`,
				},
				{
					titulo: '¿Qué tipo de certificaciones y avales ofrece?',
					parrafo: `<p>Los cursos están certificados por instituciones de prestigio, como COLMED III y Universidad EUNEIZ. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>`,
				},
				{
					titulo: '¿Qué requisitos existen para recibir la certificación? ',
					parrafo: `<p>
          • Haber abonado la totalidad del valor del curso. <br />
          • Haber finalizado y aprobado la cursada. <br/>
          • Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.
          </p> `,
				},
				{
					titulo: '¿Cómo es la modalidad de aprendizaje?  ',
					parrafo: `<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
				},
				{
					titulo: '¿Cómo es la modalidad de evaluación? ',
					parrafo: `<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>`,
				},
				{
					titulo: '¿Qué tipo de soporte ofrece? ',
					parrafo: `<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>`,
				},
				{
					titulo: '¿Cómo se puede abonar la inscripción a un curso?',
					parrafo: `<p>Con tarjeta de débito o en cuotas con tarjeta de crédito, a través de las plataformas Mercado Pago, LaPos Web o Payway, o mediante transferencia bancaria.</p>`,
				},
			];
			break;
		case 'ec':
			faqs.items = [
				{
					titulo: '¿Cómo funciona MSK?',
					parrafo: `<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>`,
				},
				{
					titulo: '¿Qué tipo de certificaciones y avales ofrece?',
					parrafo: `<p>Los cursos están certificados por instituciones de prestigio, como Universidad EUNEIZ, y avalados por Universidad de Cuenca, AFEME y ANAMER. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>`,
				},
				{
					titulo: '¿Qué requisitos existen para recibir la certificación? ',
					parrafo: `<p>
          • Haber abonado la totalidad del valor del curso. <br />
          • Haber finalizado y aprobado la cursada. <br/>
          • Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.
          </p> `,
				},
				{
					titulo: '¿Cómo es la modalidad de aprendizaje?  ',
					parrafo: `<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
				},
				{
					titulo: '¿Cómo es la modalidad de evaluación? ',
					parrafo: `<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>`,
				},
				{
					titulo: '¿Qué tipo de soporte ofrece? ',
					parrafo: `<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>`,
				},
				{
					titulo: '¿Cómo se puede abonar la inscripción a un curso?',
					parrafo: `<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de la plataforma PlacetoPay, o mediante transferencia bancaria.</p>`,
				},
			];
			break;
		case 'mx':
			faqs.items = [
				{
					titulo: '¿Cómo funciona MSK?',
					parrafo: `<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>`,
				},
				{
					titulo: '¿Qué tipo de certificaciones y avales ofrece?',
					parrafo: `<p>Los cursos están certificados por distintas instituciones de prestigio, como SAXUM University, CONAMEGE y Universidad EUNEIZ, y avalados por la Sociedad Médica del Hospital General de México. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>`,
				},
				{
					titulo: '¿Qué requisitos existen para recibir la certificación? ',
					parrafo: `<p>
          • Haber abonado la totalidad del valor del curso. <br />
          • Haber finalizado y aprobado la cursada. <br/>
          • Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.
          </p> `,
				},
				{
					titulo: '¿Cómo es la modalidad de aprendizaje?  ',
					parrafo: `<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
				},
				{
					titulo: '¿Cómo es la modalidad de evaluación? ',
					parrafo: `<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>`,
				},
				{
					titulo: '¿Qué tipo de soporte ofrece? ',
					parrafo: `<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>`,
				},
				{
					titulo: '¿Cómo se puede abonar la inscripción a un curso?',
					parrafo: `<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de las plataformas Rebill, Mercado Pago o CTC, o mediante transferencia bancaria.</p>`,
				},
			];
			break;
		case 'cl':
			faqs.items = [
				{
					titulo: '¿Cómo funciona MSK?',
					parrafo: `<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>`,
				},
				{
					titulo: '¿Qué tipo de certificaciones y avales ofrece?',
					parrafo: `<p>Los cursos están certificados por distintas instituciones de prestigio, como ANDROS-MSK OTEC y Universidad EUNEIZ. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>`,
				},
				{
					titulo: '¿Qué requisitos existen para recibir la certificación? ',
					parrafo: `<p>
          • Haber abonado la totalidad del valor del curso. <br />
          • Haber finalizado y aprobado la cursada. <br/>
          • Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.
          </p> `,
				},
				{
					titulo: '¿Cómo es la modalidad de aprendizaje?  ',
					parrafo: `<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
				},
				{
					titulo: '¿Cómo es la modalidad de evaluación? ',
					parrafo: `<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>`,
				},
				{
					titulo: '¿Qué tipo de soporte ofrece? ',
					parrafo: `<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>`,
				},
				{
					titulo: '¿Cómo se puede abonar la inscripción a un curso?',
					parrafo: `<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de las plataformas Rebill o Mercado Pago, o mediante transferencia bancaria.</p>`,
				},
			];
			break;
		case 'co':
			faqs.items = [
				{
					titulo: '¿Cómo funciona MSK?',
					parrafo: `<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>`,
				},
				{
					titulo: '¿Qué tipo de certificaciones y avales ofrece?',
					parrafo: `<p>Los cursos están certificados por distintas instituciones de prestigio, como Universidad EUNEIZ y UDIMA. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>`,
				},
				{
					titulo: '¿Qué requisitos existen para recibir la certificación? ',
					parrafo: `<p>
          • Haber abonado la totalidad del valor del curso. <br />
          • Haber finalizado y aprobado la cursada. <br/>
          • Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.
          </p> `,
				},
				{
					titulo: '¿Cómo es la modalidad de aprendizaje?  ',
					parrafo: `<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
				},
				{
					titulo: '¿Cómo es la modalidad de evaluación? ',
					parrafo: `<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>`,
				},
				{
					titulo: '¿Qué tipo de soporte ofrece? ',
					parrafo: `<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>`,
				},
				{
					titulo: '¿Cómo se puede abonar la inscripción a un curso?',
					parrafo: `<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de las plataformas Rebill o Stripe.</p>`,
				},
			];
			break;
		case 'uy':
			faqs.items = [
				{
					titulo: '¿Cómo funciona MSK?',
					parrafo: `<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>`,
				},
				{
					titulo: '¿Qué tipo de certificaciones y avales ofrece?',
					parrafo: `<p>Los cursos están certificados por distintas instituciones de prestigio, como Universidad EUNEIZ y UDIMA. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>`,
				},
				{
					titulo: '¿Qué requisitos existen para recibir la certificación? ',
					parrafo: `<p>
          • Haber abonado la totalidad del valor del curso. <br />
          • Haber finalizado y aprobado la cursada. <br/>
          • Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.
          </p> `,
				},
				{
					titulo: '¿Cómo es la modalidad de aprendizaje?  ',
					parrafo: `<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
				},
				{
					titulo: '¿Cómo es la modalidad de evaluación? ',
					parrafo: `<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>`,
				},
				{
					titulo: '¿Qué tipo de soporte ofrece? ',
					parrafo: `<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>`,
				},
				{
					titulo: '¿Cómo se puede abonar la inscripción a un curso?',
					parrafo: `<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de las plataformas Rebill o Stripe.</p>`,
				},
			];
			break;
		default:
			faqs.items = [
				{
					titulo: '¿Cómo funciona MSK?',
					parrafo: `<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>`,
				},
				{
					titulo: '¿Qué tipo de certificaciones y avales ofrece?',
					parrafo: `<p>Los cursos están certificados por distintas instituciones de prestigio, como Universidad EUNEIZ y UDIMA. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>`,
				},
				{
					titulo: '¿Qué requisitos existen para recibir la certificación? ',
					parrafo: `<p>
          • Haber abonado la totalidad del valor del curso. <br />
          • Haber finalizado y aprobado la cursada. <br/>
          • Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.
          </p> `,
				},
				{
					titulo: '¿Cómo es la modalidad de aprendizaje?  ',
					parrafo: `<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>`,
				},
				{
					titulo: '¿Cómo es la modalidad de evaluación? ',
					parrafo: `<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>`,
				},
				{
					titulo: '¿Qué tipo de soporte ofrece? ',
					parrafo: `<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>`,
				},
				{
					titulo: '¿Cómo se puede abonar la inscripción a un curso?',
					parrafo: `<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de la plataforma Stripe..</p>`,
				},
			];
			break;
	}

	return faqs;
};
