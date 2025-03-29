export function stripHtmlTags(textoConHtml: string) {
    // Elimina las etiquetas HTML usando una expresión regular
    var textoSinHtml = textoConHtml.replace(/<[^>]*>?/gm, '');

    // Elimina los saltos de línea usando otra expresión regular
    textoSinHtml = textoSinHtml.replace(/\n/g, '');

    return textoSinHtml;
}