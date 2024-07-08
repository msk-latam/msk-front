export const updateParameterToURL = (param: string, value: string) => {
    const url = new URL(window.location.href);
  //console.log(url, param, value)
    if (!url.searchParams.has("recurso") && param === 'resources' && typeof value !== 'undefined') {
        let valueToUrl = value.includes("Curso") ? 'curso' : 'guias-profesionales';
        url.searchParams.set("recurso", valueToUrl);
        // Actualizar la URL con el nuevo parámetro
        window.history.replaceState({}, document.title, url.toString());
        console.log(url,window.history,{param,value})
    }
  }