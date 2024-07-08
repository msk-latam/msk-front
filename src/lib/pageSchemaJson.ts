export const generateSchemaJson = (type: string, schemaData: any = null) =>{

    switch(type){
        case "WebSite":
            return WEBSITE_SCHEMA
        case "Course":
            let product = mapToSchema(COURSE_SCHEMA, schemaData)
            return product
        default:
            return false
    }

}

const makeInstance = (type:any, data:any) => {

    switch(type){
        case "CourseInstance":
            return { 
                // Este dato ayuda a definir las características específicas de una instancia particular del curso
                "@type": type,
                "courseMode": data.modalidad,
                "duration": data.details?.duration?.value,
                // "description": data.ficha.description podria usar la informacion de data.temario
            }
        case "Category":
            if(data.ficha.categorias) return []
            return  data.ficha.categorias.map((category: any)  => {
                return {
                    "@type": type,
                    "name": category?.name,
                    // "url": `[URL_${category.slug.toUpperCase()}]` //podria ser el slug solamente
                };
            })
        case "Organization":
            if(!data.avales) return []
            return  data.avales.map((aval: any)  => {
                return {
                    "@type": type,
                    "name": aval.title,
                    "description": aval.description,
                    "description_long": aval.description_long,
                    "image": aval.image
                };
            })
        case "Course":
            if(!data.temario) return []
            return Object.values(data.temario).map((tema: any) => {
                    return {
                        "@type": "Course",
                        "name": tema.card_title,
                        "description": tema.card_body
                    };
                })
            
    }
}

const mapToSchema = (SCHEMA: any, data: any) =>{
    switch(SCHEMA["@type"]){
        case 'Course':
            SCHEMA.hasCourseInstance = makeInstance("CourseInstance", data);
            SCHEMA.categories = makeInstance("Category", data);
            SCHEMA.avales = makeInstance("Organization", data); 
            SCHEMA.temario = makeInstance("Course", data);
            SCHEMA.offers.price = data.ficha?.data_hidden?.price

            return {
                ...SCHEMA, 
                name: data.ficha.title,
                description: data.ficha.description,
                image: data.ficha?.image,
                url: data.ficha?.data_hidden?.product_permalink,
                coursePrerequisites: data.require,
            };
    }
}

const WEBSITE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Medical & Scientific Knowledge",
    "url": "https://www.msklatam.com",
    "description": "Medical & Scientific Knowledge es una propuesta moderna que desafía a expandir las metas profesionales. Nuestra presencia en Latinoamérica y España promueve la difusión de un nuevo concepto en e-learning que transforma la experiencia de aprendizaje a distancia del personal de la salud hispanoparlante, con orientación hacia los resultados y el éxito profesional. Nuestro método de capacitación es flexible: brindamos distintos formatos de contenidos de nivel académico, entre los que se incluyen guías profesionales y webinars. Además, contamos con el respaldo de grandes instituciones de todo el mundo que certifican nuestros cursos.",
    "sameAs":
        ["https://www.instagram.com/msk.latam",
        "https://www.linkedin.com/company/msk-online-learning/",
        "https://www.facebook.com/msk.online.learning",
        "https://www.youtube.com/@msk.online.learning"]
}



const COURSE_SCHEMA = {
    "@context": "https://schema.org/",
    "@type": "Course",
    "name": "",
    "description":"",
    "provider": {
        "@type": "Organization",
        "name": "MSK Latam"
    },
    "image": "",
    "url": "", // este link hay que probarlo porque me tira 404 en msk
    "offers": {
        "@type": "Offer",
        "price": "",
        "priceCurrency": "ARS", // hay que conseguir la moneda.
        "availability": "http://schema.org/InStock", // disponibilidad del curso
        "validFrom": new Date().toISOString(), // momento en que la oferta del curso zomienza a ser valida
        "seller": { 
            "@type": "Organization",
            "name": "MSK Latam"
        }
    },
    "coursePrerequisites": "",
    "hasCourseInstance": {},
    "categories": {},
    "avales": {}, 
    "temario": {}, // Manejo del caso en que data.ficha?.temario sea undefined o null
  };