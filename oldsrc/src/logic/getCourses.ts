interface Course {
  id: number;
  related_tag: number[];
  father_id: number;
  slug: string;
  father_post_type: string;
  language_code: string;
  language_name: string;
  product_code: number;
  featured_product_text: string;
  title: string;
  image: string;
  thumbnail: {
    high: string;
    medium: string;
    low: string;
  };
  categories: {
    term_id: number;
    name: string;
    slug: string;
  }[];
  professions: {
    title: string;
    name: string;
  }[];
  duration: string;
  permalink: string;
  lista_de_cedentes: {
    ID: number;
    post_author: string;
    post_date: string;
    post_date_gmt: string;
    post_content: string;
    post_title: string;
    post_excerpt: string;
    post_status: string;
    comment_status: string;
    ping_status: string;
    post_password: string;
    post_name: string;
    to_ping: string;
    pinged: string;
    post_modified: string;
    post_modified_gmt: string;
    post_content_filtered: string;
    post_parent: number;
    guid: string;
    menu_order: number;
    post_type: string;
    post_mime_type: string;
    comment_count: string;
    filter: string;
    imagen: string;
  }[];
  why_course: string;
  is_new: boolean;
  nac_schools: null;
  int_schools: null;
  isbn: string;
  purchase_option: string;
  diploma: null;
  is_free: boolean;
  total_price: string;
  max_installments: string;
  price_installments: string;
  created_at: string;
}

export const buildCourseSchema = (data: any) => {
  console.log({databuildcourseschema: data});
  let schema = null;
  
  if(data != undefined && data != null){

   const temario = data?.temario ? Object.values(data.temario).map((tema: any) => {
      return {
          "@type": "Course",
          "name": tema.card_title,
          "description": tema.card_body
      };
    }) : []

    schema = {
      "@context": "http://schema.org/",
      "@type": "Course",
      "name": data?.ficha?.title,
      "description": data.ficha?.description,
      "provider": {
          "@type": "Organization",
          "name": "MSK Latam"
      },
      "image": data.ficha?.image,
      "url": data.ficha?.data_hidden?.product_permalink, // este link hay que probarlo porque me tira 404 en msk
      "offers": {
          "@type": "Offer",
          "price": data.ficha?.data_hidden?.price,
          "priceCurrency": "ARS", // hay que conseguir la moneda.
          "availability": "http://schema.org/InStock", // disponibilidad del curso
          "validFrom": new Date().toISOString(), // momento en que la oferta del curso zomienza a ser valida
          "seller": { // vendedor
              "@type": "Organization",
              "name": "MSK Latam"
          }
      },
      "coursePrerequisites": data.require,
      "hasCourseInstance": { // Este dato ayuda a definir las características específicas de una instancia particular del curso
          "@type": "CourseInstance",
          "courseMode": data.modalidad,
          "duration": data.details?.duration?.value,
          // "description": data.ficha.description podria usar la informacion de data.temario
      },
      "categories": data.ficha?.categorias ? data.ficha?.categorias?.map((category: any)  => {
          return {
              "@type": "Category",
              "name": category?.name,
              // "url": `[URL_${category.slug.toUpperCase()}]` //podria ser el slug solamente
          };
      }) : [],
      "productCode": data.ficha?.product_code, // Agrega el campo "product_code" al esquema
      "certificate": data.ficha?.data_hidden?.certificate ? "Certificado" : "No certificado", // Agrega la información sobre si el curso está certificado o no,
      "avales": data.avales ? data.avales.map((aval: any) => {
        return {
            "@type": "Organization",
            "name": aval.title,
            "description": aval.description,
            "description_long": aval.description_long,
            "image": aval.image
        };
      }) : [], 
      "temario": temario, // Manejo del caso en que data.ficha?.temario sea undefined o null
      "temario_link_pdf": data.temario_link_pdf
    
    };
  }

  return schema;
}