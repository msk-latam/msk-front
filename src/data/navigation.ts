import { MegamenuItem, NavItemType } from '@/components/Navigation/NavigationItem';
import ncNanoId from '@/utils/ncNanoId';
import __megamenu from './jsons/__megamenu.json';

const megaMenuDemo: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image:
			'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXBhbnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'Company',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.Company,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFwcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'App Name',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.AppName,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'City',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.City,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.unsplash.com/photo-1575328630189-440449ed8cd1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNvbnRydWN0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'Contruction',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.Contruction,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291bnRyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'Country',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.Country,
		})),
	},
];

const megaMenu3ItemDemo: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image:
			'http://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'Corporate',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.Corporate,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'Car Model',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.CarModel,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmV0YWlsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
		title: 'Department',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '#',
			name: i.Department,
		})),
	},
];

const dashboardChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/dashboard',
		name: 'Dashboard',
	},
	{
		id: ncNanoId(),
		href: '/dashboard/posts',
		name: 'Posts',
	},
	{
		id: ncNanoId(),
		href: '/dashboard/edit-profile',
		name: 'Edit profile',
	},
	{
		id: ncNanoId(),
		href: '/dashboard/billing-address',
		name: 'Billing address',
	},
	{
		id: ncNanoId(),
		href: '/dashboard/subscription',
		name: 'Subscription',
	},
	{
		id: ncNanoId(),
		href: '/dashboard/submit-post',
		name: 'Submit post',
	},
];

const otherPageChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/about',
		name: 'About',
	},
	{
		id: ncNanoId(),
		href: '/contact',
		name: 'Contact us',
	},
	{
		id: ncNanoId(),
		href: '/login',
		name: 'Login',
	},
	{
		id: ncNanoId(),
		href: '/crear-cuenta',
		name: 'Signup',
	},
	{
		id: ncNanoId(),
		href: '/recuperar',
		name: 'Recuperar Contraseña',
	},
	{
		id: ncNanoId(),
		href: '/dashboard',
		name: 'Dashboard',
		type: 'dropdown',
		children: dashboardChildMenus,
	},
	{
		id: ncNanoId(),
		href: '/subscription',
		name: 'Subscription',
	},
];

const archviePageChildrenMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/archive/the-demo-archive-slug',
		name: 'Archive Page',
	},
	{
		id: ncNanoId(),
		href: '/archive-audio/the-demo-archive-slug',
		name: 'Archive Audio',
	},
	{
		id: ncNanoId(),
		href: '/archive-video/the-demo-archive-slug',
		name: 'Archive Video',
	},
	{
		id: ncNanoId(),
		href: '/author/the-demo-author-slug',
		name: 'Author Pages',
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/author/the-demo-author-slug',
				name: 'Author Page 1',
			},
			{
				id: ncNanoId(),
				href: '/author-v2/the-demo-author-slug',
				name: 'Author Page 2',
			},
		],
	},
	{
		id: ncNanoId(),
		href: '/search',
		name: 'Search Pages',
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/search',
				name: 'Seach Page 1',
			},
			{
				id: ncNanoId(),
				href: '/search-v2',
				name: 'Search Page 2',
			},
		],
	},
];

const singleChildrenMenus: NavItemType = {
	id: ncNanoId(),
	href: '/single/this-is-single-slug',
	name: 'Single Templates',
	isNew: true,
	type: 'dropdown',
	children: [
		{
			id: ncNanoId(),
			href: '/single-sidebar/this-is-single-slug',
			name: 'Single style 1',
		},
		{
			id: ncNanoId(),
			name: 'Single 1 sidebar',
			href: '/single/this-is-single-slug-2',
		},
		{
			id: ncNanoId(),
			href: '/single-template-2/this-is-single-slug-2',
			name: 'Single style 2',
		},
		{
			id: ncNanoId(),
			href: '/single-2-sidebar/this-is-single-slug',
			name: 'Single 2 sidebar',
		},
		{
			id: ncNanoId(),
			href: '/single-template-3/this-is-single-slug-3',
			name: 'Single style 3',
		},
		{
			id: ncNanoId(),
			href: '/single-3-sidebar/this-is-single-slug',
			name: 'Single 3 sidebar',
		},
		{
			id: ncNanoId(),
			href: '/single-4-sidebar/this-is-single-slug',
			name: 'Single style 4 ',
			isNew: true,
		},
	],
};

const demoChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/home-header-style2',
		name: 'Header Styles',
		isNew: true,
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/home-header-style1',
				name: 'Header - 1',
			},
			{
				id: ncNanoId(),
				href: '/home-header-style2',
				name: 'Header - 2',
				isNew: true,
			},
			{
				id: ncNanoId(),
				href: '/home-header-style2-logedin',
				name: 'Header Logedin',
				isNew: true,
			},
		],
	},
	{
		id: ncNanoId(),
		name: process.env.VITE_LRT_OR_RTL === 'rtl' ? 'Default Demo - LTR' : 'Home Demo 1',
		targetBlank: process.env.VITE_LRT_OR_RTL === 'rtl',
		href: process.env.VITE_LRT_OR_RTL === 'rtl' ? 'https://chisnghiax.com/ncmaz/' : '/',
	},

	{
		id: ncNanoId(),
		href: '/home-demo-2',
		name: 'Home Demo 2',
	},
	{
		id: ncNanoId(),
		href: '/home-demo-3',
		name: 'Home Demo 3',
	},
	{
		id: ncNanoId(),
		href: '/home-demo-4',
		name: 'Home Demo 4',
	},
	{
		id: ncNanoId(),
		href: '/home-demo-6',
		name: 'Home - News',
	},
	{
		id: ncNanoId(),
		href: process.env.VITE_LRT_OR_RTL !== 'rtl' ? 'https://chisnghiax.com/ncmaz-rtl/' : '/',
		name: 'Home Demo - RTL',
		targetBlank: process.env.VITE_LRT_OR_RTL !== 'rtl',
	},
];

const templateChilds: NavItemType[] = [
	...archviePageChildrenMenus,
	singleChildrenMenus,
	{
		id: ncNanoId(),
		href: '/single-gallery/this-is-single-slug',
		name: 'Single Gallery',
	},
	{
		id: ncNanoId(),
		href: '/single-audio/this-is-single-slug',
		name: 'Single Audio',
	},
	{
		id: ncNanoId(),
		href: '/single-video/this-is-single-slug',
		name: 'Single Video',
	},
];

export const NAVIGATION_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		type: 'dropdown',
		children: demoChildMenus,
	},
	{
		id: ncNanoId(),
		href: '#',
		name: 'Five cols',
		type: 'megaMenu',
		megaMenu: megaMenuDemo,
	},

	{
		id: ncNanoId(),
		href: '#',
		name: 'Fewer cols',
		type: 'megaMenu',
		megaMenu: megaMenu3ItemDemo,
	},
	{
		id: ncNanoId(),
		href: '#',
		name: 'Templates',
		type: 'dropdown',
		children: templateChilds,
	},
	{
		id: ncNanoId(),
		href: '#',
		name: 'Other pages',
		type: 'dropdown',
		children: otherPageChildMenus,
	},
];

export const NAVIGATION_SHORT_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		type: 'dropdown',
		children: demoChildMenus,
	},
	{
		id: ncNanoId(),
		href: '#',
		name: 'Discover',
		type: 'dropdown',
		children: templateChilds,
	},
	{
		id: ncNanoId(),
		href: '/about',
		name: 'How it works',
	},
];

//////////////////////////////////////////////
const aboutMenu: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/tienda',
		name: 'Cursos para personal médico',
		search: 'profesion=medicos&recurso=curso',
	},
	{
		id: ncNanoId(),
		href: '/tienda',
		name: 'Cursos para enfermería y otras profesiones',
		search: 'profesion=otra-profesion',
	},
	// {
	//   id: ncNanoId(),
	//   href:
	//     process.env.VITE_LRT_OR_RTL !== "rtl"
	//       ? "https://chisnghiax.com/ncmaz-rtl/"
	//       : "/",
	//   name: "Home Demo - RTL",
	//   targetBlank: process.env.VITE_LRT_OR_RTL !== "rtl",
	// },
];
const resourcesMenu: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/tienda',
		name: 'Guías profesionales',
		search: 'recurso=guias-profesionales',
	},
	{
		id: ncNanoId(),
		href: '/blog',
		name: 'Blog',
	},
	/* {
    id: ncNanoId(),
    href: "/webinars",
    name: "Webinars",
  },
  {
    id: ncNanoId(),
    href: "/podcasts",
    name: "Podcasts",
  }, */
];

// const accountMenu: NavItemType[] = [
//   {
//     id: ncNanoId(),
//     href: '/mi-cuenta/inicio',
//     name: 'Mi Cuenta',
//     search: '',
//   },
//   {
//     id: ncNanoId(),
//     href: '/mi-perfil',
//     name: 'Mi Perfil',
//     search: '',
//   },
// ];

export const NAVIGATION_MSK: NavItemType[] = [
	// {
	//   id: ncNanoId(),
	//   name: 'Qué ofrecemos',
	//   type: 'dropdown',
	//   children: aboutMenu,
	// },
	// {
	//   id: ncNanoId(),
	//   name: 'Recursos',
	//   type: 'dropdown',
	//   children: resourcesMenu,
	// },
	// {
	//   id: ncNanoId(),
	//   href: "/tienda",
	//   name: "Tienda",
	// },
	// {
	//   id: ncNanoId(),
	//   href: "/shop",
	//   name: "Carrito",
	// },
];

const categoriesMenuBlog: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/blog/archivo/',
		name: 'Medicina',
		search: '?categoria=medicina',
	},
	{
		id: ncNanoId(),
		href: '/blog/archivo/',
		name: 'Enfermería',
		search: '?categoria=enfermeria',
	},
	{
		id: ncNanoId(),
		href: '/blog/archivo/',
		name: 'E-Learning',
		search: '?categoria=e-learning',
	},
];

const resourcesMenuBlog: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/tienda',
		name: 'Capacitaciones',
	},
	{
		id: ncNanoId(),
		href: '/tienda',
		name: 'Guías profesionales',
		search: 'recurso=guias-profesionales',
	},
	/* {
    id: ncNanoId(),
    href: "/webinars",
    name: "Webinars",
  },
  {
    id: ncNanoId(),
    href: "/podcasts",
    name: "Podcasts",
  }, */
];

export const NAVIGATION_BLOG_MSK: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/blog',
		name: 'Secciones',
		type: 'dropdown',
		children: categoriesMenuBlog,
	},
	{
		id: ncNanoId(),
		name: 'Recursos',
		type: 'dropdown',
		children: resourcesMenuBlog,
	},
];

const categoriesMenuArchive: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/blog/archivo/',
		name: 'Medicina',
		search: '?categoria=medicina',
	},
	{
		id: ncNanoId(),
		href: '/blog/archivo/',
		name: 'Enfermería',
		search: '?categoria=enfermeria',
	},
	{
		id: ncNanoId(),
		href: '/blog/archivo',
		name: 'E-Learning',
		search: '?categoria=e-learning',
	},

	/*  {
    id: ncNanoId(),
    href: "/archivo",
    name: "Entrevistas",
    search: "?categoria=Entrevistas",
  },
  {
    id: ncNanoId(),
    href: "/archivo",
    name: "Opinión",
    search: "?categoria=Opinión",
  }, */
];

export const NAVIGATION_ARCHIVE_MSK: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/blog/archivo',
		name: 'Categorías',
		type: 'dropdown',
		children: categoriesMenuArchive,
	},
	{
		id: ncNanoId(),
		name: 'Recursos',
		type: 'dropdown',
		children: resourcesMenuBlog,
	},
];

export const NAVIGATION_USER: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/mi-perfil',
		name: ' Mi Perfil',
	},
	{
		id: ncNanoId(),
		href: '/mi-cuenta/inicio',
		name: 'Configurar mi cuenta',
	},
];
