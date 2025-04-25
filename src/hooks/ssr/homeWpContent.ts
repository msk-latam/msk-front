import { FetchSingleProduct } from "@/data/types";

const homeWpContent = (product: FetchSingleProduct) => {
  const isEbookProduct = Object.values(product.details).some((detail) =>
    detail.value.includes("Ebook")
  );
  const { lista_de_cedentes, authors } = product;
  let imagen = "";
  let title = "";
  if (isEbookProduct) {
    const [firstAuthor] = authors;
    const imageOfAuthor = firstAuthor?.image?.replace("mx.", "");
    const authorName = firstAuthor?.name || "-";
    imagen = imageOfAuthor;
    title = authorName;
  } else if (lista_de_cedentes) {
    const [firstCedente] = lista_de_cedentes;
    if (firstCedente) {
      if (firstCedente.imagen) {
        const imageOfCedente = firstCedente.imagen.replace("mx.", "") || "";
        imagen = imageOfCedente;
      }
      const cedenteName = firstCedente?.post_title || "-";
      title = cedenteName;
    }
  }

  return { isEbook: isEbookProduct, imagen, title };
};

export default homeWpContent;
