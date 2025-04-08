// HERO SECTION
export interface HeroSlide {
    background_image: [string, number, number, boolean];
    title: string;
    tag: string;
    cta: {
      title: string;
      url: string;
      target: string;
    };
}

export interface HeroSection {
    slides: HeroSlide[];
}

// OPORTUNIDADES SECTION

export type CursoWP = {
  id: number;
  title: string;
  featured_image: string;
  link: string;
  duration: string | null;
  categories: { name: string }[];
  cedente: any[];
};

export type CursoCardProps = {
  id: number;
  categoria: string;
  titulo: string;
  temas: number;
  horas: number;
  inscriptos: number;
  certificado: string;
  imagen: string;
};

export const mapCursoWPToCursoCard = (curso: CursoWP): CursoCardProps => ({
  id: curso.id,
  categoria: curso.categories?.[0]?.name || "General", // Si `categories` está vacío, se usa "General".
  titulo: curso.title,
  temas: Math.floor(Math.random() * 10 + 5), // Mock para cantidad de temas
  horas: parseInt(curso.duration || "12"), // Si la duración está vacía, se asume 12 horas.
  inscriptos: Math.floor(Math.random() * 10000 + 1000), // Mock para inscriptos
  certificado: "Incluido", // Valor por defecto
  imagen: curso.featured_image || "/images/curso-placeholder.jpg", // Si no hay imagen, usa la imagen placeholder
});

// MASTERCLASS SECTION
export interface Professional {
    nombre: string;
    especialidad: string;
    imagenDesktop: string;
    imagenMobile: string;
    perfilUrl: string;  // URL del perfil del profesional
  }
  
  export interface MasterclassSection {
    professionals: Professional[];
  }
  
  export const mapProfessionalToCard = (professional: Professional) => ({
    nombre: professional.nombre,
    especialidad: professional.especialidad,
    imagenDesktop: professional.imagenDesktop,
    imagenMobile: professional.imagenMobile,
    perfilUrl: professional.perfilUrl,
  });

  // BLOG SECTION

  export type Category = {
    id: number;
    name: string;
    slug: string;
  };
  
  export type BlogPost = {
    id: number;
    title: string;
    subtitle?: string;
    author: string;
    date: string;
    readTime: string | null;
    tags: string[];
    featured_image: string;
    link: string;
    categories: Category[];
    featured: string; // Marks if the post is featured
  };
  
  export type BlogResponse = {
    title: string;
    subtitle: string;
    featured_blog_articles: BlogPost[];
  };

  // FQA SECTION

export type Faq = {
    question: string;
    answer: string;
    id: number;
  };
  
  export type FaqResponse = {
    data: Faq[];
  };
  
  
  
  
  
  
  