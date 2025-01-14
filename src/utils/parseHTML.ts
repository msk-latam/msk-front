export const parseHtml = (
	contentHtml: string,
	removesContainer: boolean = false,
	options: { ignoreClassName: string } | null = null,
) => {
	// Tu contenido HTML
	if (typeof document !== 'undefined') {
		const htmlContent: string = contentHtml;
		// Crear un elemento HTML temporal para analizar el contenido
		const tempElement = document.createElement('div');
		tempElement.innerHTML = htmlContent;

		const emElements = tempElement.querySelectorAll('em');
		emElements.forEach((em) => {
			em.classList.add('!font-lora-italic'); // Agregar una clase si quieres asegurarte de que se aplique un estilo de Tailwind
		});

		// Buscar elementos UL dentro del contenido
		const ulElements = tempElement.querySelectorAll('ul');

		const pElement = tempElement.querySelector('p');
		pElement?.classList.add('text-violet-strong');

		const spanElements = tempElement.querySelectorAll('span');
		spanElements.forEach((span) => {
			if (options != null || (!span.classList.contains('font-lora') && span.id != 'font-lora-italic')) {
				span.className = '';
				if (options != null && options.ignoreClassName !== 'font-lora') {
					span.classList.add('font-lora');
				}
			}

			const brElements = span.querySelectorAll('br');
			let brCount = 0;

			brElements.forEach((brElement, index) => {
				if (brElement.previousElementSibling?.tagName === 'BR') {
					brCount++;
				} else {
					brCount = 0;
				}
				// if (brCount >= 4) {
				// 	brElement.remove();
				// }
			});
		});

		ulElements.forEach((ulElement) => {
			ulElement.classList.add('m-0', 'flex', 'flex-col');
			const liElements = ulElement.querySelectorAll('li');
			const brElements = ulElement.querySelectorAll('br');

			brElements.forEach((brElement) => {
				if (brElement.parentNode) {
					brElement?.parentNode.removeChild(brElement);
				}
			});

			liElements.forEach((liElement, index) => {
				// Crear una imagen y configurar sus atributos
				if (index === 0) {
					liElement.classList.add('mt-6');
				}

				liElement.classList.add('flex', 'items-start', 'mb-6', 'md:items-center');

				const spanElements = liElement.querySelectorAll('span');

				spanElements.forEach((spanElement) => {
					// Verificar si el <span> está vacío
					if (spanElement.parentNode && spanElement.textContent) {
						// Si el <span> está vacío, eliminarlo
						spanElement?.textContent.trim() === '' ? spanElement.parentNode.removeChild(spanElement) : null;
					}
				});

				const imgElement = document.createElement('img');
				imgElement.classList.add('m-0', 'mr-3', 'w-5', 'mt-2');
				//console.log({ imgElement });
				imgElement.src = '/images/vectors/isotipo.svg'; // Cambia la URL de la imagen según tus necesidades
				imgElement.alt = 'Imagen'; // Cambia el texto alternativo según tus necesidades

				// Agregar la imagen al LI
				liElement.insertBefore(imgElement, liElement.firstChild);
			});
		});

		if (removesContainer) {
			// Obtener el contenido HTML del primer hijo del tempElement
			const child = tempElement?.firstChild as HTMLElement;
			return child ? child.innerHTML : '';
		}

		// Obtener el contenido modificado como cadena de texto
		return tempElement.innerHTML;
	} else {
		return contentHtml;
	}
};
