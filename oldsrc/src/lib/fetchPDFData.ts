export async function fetchPdfData(resourceMedia: string) {
  const replacedUrl = resourceMedia.replace(
    /^(https?:\/\/)(ar\.|mx\.|cl\.|ec\.)/,
    "$1"
  );
  try {
    const response = await fetch(replacedUrl);
    if (!response.ok) {
      throw new Error("No se pudieron obtener los datos del PDF");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos del PDF:", error);
    return null;
  }
}
