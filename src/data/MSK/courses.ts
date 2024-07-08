// TABS LIST
const TABS_HOME = ["Novedades", "Recomendados"];

// COURSES LIST
const HOME_COURSES = [
  {
    index: 1,
    id: "9e3e3994-a3ed-47ca-a014-d4483884cfe2",
    featuredImage: "/imageshome/opp1.png",
    title: "ACCSAP. Programa de actualización en cardiología clínica",
    desc: "American College of Cardiology",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: { count: 3007, isBookmarked: false },
    like: { count: 3366, isLiked: true },
    authorId: 3,
    author: {
      name: "American College of Cardiology",
      img: "/imagesavatar/avatar_1.png",
    },
    categories: [{ name: "Cardiología" }],
    postType: "standard",
    list: [
      {
        title: "Matriz de priorización",
      },
    ],
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
    modality: "100% online, todo el día",
    available: "24 meses",
    counseling: true,
    certification: true,
    language: "Español",
  },
  {
    index: 2,
    id: "af92a665-4a4d-4cff-9e17-89456df21fb5",
    featuredImage: "/imageshome/opp2.png",
    title: "Curso de preparación oposiciones de anestesia y reanimación",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 13,
    viewdCount: 9999,
    readingTime: 5,
    bookmark: { count: 3751, isBookmarked: false },
    like: { count: 3024, isLiked: false },
    authorId: 4,
    author: "",
    categories: [{ name: "Anestesiología" }],
    postType: "video",
    videoUrl: "https://www.youtube.com/watch?v=U5afsxvz75c",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
  {
    index: 3,
    id: "dffe0224-ebff-4803-bb66-e8d128656284",
    featuredImage: "/imageshome/opp3.png",
    title: "Curso de Endocrinología y Nutrición",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 33,
    viewdCount: 8888,
    readingTime: 2,
    bookmark: { count: 76, isBookmarked: false },
    like: { count: 222, isLiked: false },
    authorId: 4,

    author: "",
    categories: [{ name: "Nutrición" }],
    postType: "standard",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
  {
    index: 4,
    id: "5ac7cb90-4694-42e8-8883-16372711eaa8",
    featuredImage: "/imageshome/opp4.png",
    title: "Curso online de preparación oposiciones de medicina interna",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 49,
    viewdCount: 10000,
    readingTime: 6,
    bookmark: { count: 264, isBookmarked: true },
    like: { count: 3735, isLiked: true },
    authorId: 5,

    author: "",
    categories: [{ name: "Medicina Interna" }],
    postType: "standard",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
  {
    index: 5,
    id: "f82a8455-3a14-4af9-b6d2-ac6cd74e007c",
    featuredImage: "/imageshome/opp5.png",
    title: "Curso de Cardiología",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 9,
    viewdCount: 7777,
    readingTime: 5,
    bookmark: { count: 733, isBookmarked: false },
    like: { count: 3569, isLiked: true },
    authorId: 10,
    author: "",
    categories: [{ name: "Cardiología" }],
    postType: "video",
    videoUrl: "https://www.youtube.com/watch?v=dBsicD0ItD0&t=32s",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
  {
    index: 6,
    id: "54c11c92-049f-4353-8cdb-f7ec70d3ae75",
    featuredImage: "/imageshome/opp6.png",
    title: "Curso superior en médicina interna. MKSAP 18",
    desc: "American College of Cardiology",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 13,
    viewdCount: 4475,
    readingTime: 2,
    bookmark: { count: 199, isBookmarked: false },
    like: { count: 3052, isLiked: true },
    authorId: 9,

    author: "",
    categories: [{ name: "Medicina Interna" }],
    postType: "standard",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
];

const TOP_COURSES = [
  {
    index: 91991123123,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina general",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "/imagescourses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 9199112312323333,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina general",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "/imagescourses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina general",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "/imagescourses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina general",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "/imagescourses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina general",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "/imagescourses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina general",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "/imagescourses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
  {
    index: 91991,
    id: "DEMO_POSTS_AUDIO_1",
    featuredImage:
      "https://images.pexels.com/photos/6843304/pexels-photo-6843304.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    title: "Lenovo’s smarter devices ",
    desc: "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    date: "May 20, 2021",
    href: "/single-audio/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: {
      count: 3007,
      isBookmarked: false,
    },
    like: {
      count: 3366,
      isLiked: true,
    },
    authorId: 3,
    categoriesId: [3, 12],
    postType: "audio",
    audioUrl:
      "https://chisnghiax.com/ncmaz_mp3/Alan_Walker_-_AloneMP3_128K.mp3",
    author: {
      id: 3,
      firstName: "Nathanil",
      lastName: "Foulcher",
      displayName: "Foulcher Nathanil",
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: "/src/data/avatars/3.jpg",
      count: 43,
      href: "/author/the-demo-author-slug",
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage:
        "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    },
    categories: [
      {
        id: 3,
        name: "Medicina general",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "/imagescourses/medical.png",
        count: 15,
        color: "yellow",
        taxonomy: "category",
      },
    ],
  },
];

const DETAILS_COURSES = [
  {
    index: 1,
    id: "9e3e3994-a3ed-47ca-a014-d4483884cfe2",
    featuredImage: "/imagesbrands/acp_2.png",
    title: "ACCSAP. Programa de actualización en cardiología clínica",
    desc: "American College of Cardiology",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 11,
    viewdCount: 2504,
    readingTime: 2,
    bookmark: { count: 3007, isBookmarked: false },
    like: { count: 3366, isLiked: true },
    authorId: 3,
    author: {
      name: "American College of Cardiology",
      img: "/imagesavatar/avatar_1.png",
    },
    categories: [{ name: "Cardiología" }],
    postType: "standard",
    list: [
      {
        title: "Matriz de priorización",
      },
    ],
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
  {
    index: 2,
    id: "af92a665-4a4d-4cff-9e17-89456df21fb5",
    featuredImage: "/imagesbrands/cmpba.png",
    title: "Curso de preparación oposiciones de anestesia y reanimación",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 13,
    viewdCount: 9999,
    readingTime: 5,
    bookmark: { count: 3751, isBookmarked: false },
    like: { count: 3024, isLiked: false },
    authorId: 4,
    author: "",
    categories: [{ name: "Anestesiología" }],
    postType: "video",
    videoUrl: "https://www.youtube.com/watch?v=U5afsxvz75c",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
  {
    index: 3,
    id: "dffe0224-ebff-4803-bb66-e8d128656284",
    featuredImage: "/imagesbrands/esem.png",
    title: "Curso de Endocrinología y Nutrición",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 33,
    viewdCount: 8888,
    readingTime: 2,
    bookmark: { count: 76, isBookmarked: false },
    like: { count: 222, isLiked: false },
    authorId: 4,

    author: "",
    categories: [{ name: "Nutrición" }],
    postType: "standard",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
  {
    index: 4,
    id: "5ac7cb90-4694-42e8-8883-16372711eaa8",
    featuredImage: "/imagesbrands/afeme.png",
    title: "Curso online de preparación oposiciones de medicina interna",
    desc: "Tropos",
    date: "May 20, 2021",
    href: "/single/this-is-single-slug",
    commentCount: 49,
    viewdCount: 10000,
    readingTime: 6,
    bookmark: { count: 264, isBookmarked: true },
    like: { count: 3735, isLiked: true },
    authorId: 5,

    author: "",
    categories: [{ name: "Medicina Interna" }],
    postType: "standard",
    level: "Básico",
    price: "150",
    discount_price: "100",
    length: "250 horas",
    content: "10 Módulos",
    summary: `Este prestigioso programa desarrollado por el American College
    of Cardiology le permitirá al profesional actualizar y
    fortalecer sus conocimientos sobre guías, y protocolos clínicos
    y de práctica, obtener información de investigaciones emergentes
    y su aplicación a la práctica y el rendimiento de su práctica
    profesional alcanzando los más altos estándares internacionales.`,
  },
];

const USER_COURSES = [
  {
    id: "9e3e3994-a3ed-47ca-a014-d4483884cfe2",
    featuredImage: "/imageshome/opp1.png",
    title: "ACCSAP. Programa de actualización en cardiología clínica",
    status: true,
    payment: "Aprobado",
  },
  {
    id: "9e3e3994-a3ed-47ca-a01234-d4483884cfe2",
    featuredImage: "/imageshome/opp2.png",
    title: "ACCSAP. Programa de actualización en cardiología clínica",
    status: true,
    payment: "Aprobado",
  },
  {
    id: "9e3e3994-a3ed-47ca-a014-d4483884cfe2123",
    featuredImage: "/imageshome/opp3.png",
    title: "ACCSAP. Programa de actualización en cardiología clínica",
    status: false,
    payment: "Desaprobado",
  },
];

export { TABS_HOME, HOME_COURSES, TOP_COURSES, DETAILS_COURSES, USER_COURSES };
