// data/blogMock.ts

export type Variant = 'primary' | 'secondary' | 'tertiary';

export type BlogPost = {
  id: number;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  action: {
    label: string;
    variant: Variant;
  };
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Comunicación efectiva: útil en las residencias médicas',
    subtitle: 'Existen evidencias acerca de los beneficios que obtienen los profesionales.',
    author: 'Nombre Apellido',
    date: 'May 20, 2025',
    readTime: '3 min read',
    tags: ['Medicina', 'Guía profesional'],
    image: '/images/blog/blog1.jpg',
    action: { label: 'Descubrir', variant: 'primary' },
    featured: true,
  },
  {
    id: 2,
    title: 'Cáncer de cuello uterino: avanza la prevención...',
    author: 'Nombre Apellido',
    date: 'May 20, 2025',
    readTime: '3 min read',
    tags: ['Medicina', 'Actualidad'],
    image: '/images/blog/blog2.jpg',
    action: { label: 'Leer', variant: 'secondary' },
  },
  {
    id: 3,
    title: 'Es necesario implementar programas de formación...',
    author: 'Nombre Apellido',
    date: 'May 20, 2025',
    readTime: '3 min read',
    tags: ['Medicina', 'Actualidad'],
    image: '/images/blog/blog3.jpg',
    action: { label: 'Leer', variant: 'secondary' },
  },
  {
    id: 4,
    title: 'Avances en cardiología están salvando más vidas',
    author: 'Nombre Apellido',
    date: 'May 20, 2025',
    readTime: '3 min read',
    tags: ['Medicina', 'Actualidad'],
    image: '/images/blog/blog4.jpg',
    action: { label: 'Leer', variant: 'secondary' },
  },
  {
    id: 5,
    title: 'Día Mundial de la Tuberculosis',
    author: '',
    date: '',
    readTime: '3 min read',
    tags: [],
    image: '/images/blog/blog5.jpg',
    action: { label: 'Leer', variant: 'secondary' },
  },
  
];
