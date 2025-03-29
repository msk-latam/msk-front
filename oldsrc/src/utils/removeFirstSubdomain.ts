export function removeFirstSubdomain(url: string): string {
    // Definir la expresión regular para capturar el primer subdominio
    const patron = /^https?:\/\/(?:\w+\.)+(\w+\.\w+)(.*)$/;
    
    // Buscar coincidencias en la URL
    const coincidencia = url.match(patron);
    
    if (coincidencia) {
        // Obtener el resto de la URL después del primer subdominio
        const dominio = coincidencia[1];
        const restoUrl = coincidencia[2];
        // Reemplazar el primer subdominio en la URL original y devolver la URL modificada
        return `https://wp.${dominio}${restoUrl}`;
    } else {
      //"La URL no es válida o no tiene subdominios.";
        return "";
    }
}