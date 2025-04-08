// modules/home/services/cursos.service.ts

export const getCursosDesdeWP = async () => {
    try {
      // Realizamos el fetch
      const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=es");
  
      // Verificamos si la respuesta es exitosa
      if (!res.ok) {
        throw new Error("Error al obtener los cursos desde WordPress");
      }
  
      // Parseamos la respuesta JSON
      const json = await res.json();
  
      // Extraemos las secciones de los cursos
      const secciones = json?.sections?.courses || {};
  
      // Devolvemos las secciones de los cursos (novedades, recomendados, gratuitos)
      return {
        novedades: secciones.courses_news || [],
        recomendados: secciones.courses_recommended || [],
        gratuitos: secciones.courses_free || [],
      };
    } catch (error) {
      // Si algo falla, lo logueamos y devolvemos un objeto vacío
      console.error("Error en el servicio de cursos:", error);
      return {
        novedades: [],
        recomendados: [],
        gratuitos: [],
      };
    }
  };
  