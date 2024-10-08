import { useContext, useEffect, useState } from 'react';
import Input from '@/components/Input/Input';
import { CountryContext } from '@/context/country/CountryContext';
import { FetchCourseType } from '@/data/types';
import NcLink from '../NcLink/NcLink';
import NcImage from '../NcImage/NcImage';
import { usePathname } from 'next/navigation';
import ssr from '@/services/ssr';
import { removeFirstSubdomain } from '@/utils/removeFirstSubdomain';

const SearchProducts = () => {
	const [auxProducts, setAuxProducts] = useState<FetchCourseType[]>([]);
	const [products, setProducts] = useState<FetchCourseType[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [isInputFocused, setIsInputFocused] = useState(false);
	const { countryState } = useContext(CountryContext);
	const [isOnBlog, setIsOnBlog] = useState(false);

	const removeAccents = (str: string) => {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase();
	};

	const triggerSearch = (event: any) => {
		const value = event.target.value;
		setInputValue(value);
		if (value) {
			console.log(value);
			const filteredProducts = auxProducts.filter((product) =>
				removeAccents(product.title.toLowerCase()).includes(removeAccents(value.toLowerCase())),
			);
			console.log(filteredProducts);
			setProducts(filteredProducts);
		} else {
			setProducts(auxProducts);
		}
	};

	const onBlur = () => {
		setTimeout(() => {
			setIsInputFocused(false);
		}, 200);
	};

	const onFocus = () => {
		setIsInputFocused(true);
	};

	const clearInputValue = () => {
		setInputValue('');
	};

	const pathname = usePathname();
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Variables locales
				let courses;
				let productsCountry = countryState.country === 'int' ? '' : countryState.country;

				// Si estamos en el blog, no se buscan cursos
				if (pathname?.includes('/blogg')) {
					// console.log('Estamos en el blog. No se fetch de productos.');
					setIsOnBlog(true);
				} else {
					// Si no hay productos aún, hacemos fetch de los productos
					if (!products || products.length === 0) {
						// console.log(
						//   'No products found, fetching products for country:',
						//   productsCountry,
						// );

						// Hacemos fetch de productos desde el SSR
						courses = await ssr.getStoreCourses(productsCountry, window.location.href);

						// Debug logs
						// console.log('Courses fetched:', courses);

						// Seteamos los productos si encontramos cursos
						if (courses && courses.length > 0) {
							setAuxProducts(courses);
							setProducts(courses);
							setIsOnBlog(false);
						} else {
							console.warn('No courses found for country:', productsCountry);
						}
					} else {
						console.log('Products already exist, no need to fetch.');
					}
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [pathname, countryState, products]);

	return (
		<div className='search-products'>
			<div className='relative'>
				<Input
					type='search'
					placeholder='Buscar'
					className='pr-10 w-full'
					sizeClass='h-[42px] pl-4 py-3'
					value={inputValue}
					onChange={triggerSearch}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				<NcImage
					src={'/images/icons/search.svg'}
					className='absolute top-2.5 right-2'
					alt='Search Icon'
					width='21'
					height='21'
				/>
			</div>
			{inputValue && isInputFocused && (
				<div className='search-products-results'>
					{products
						.map((product, index) => (
							<NcLink
								href={`/${isOnBlog ? 'blog' : 'curso'}/${product.slug}`}
								key={product.id}
								className='product-item font-medium'
								onClick={() => clearInputValue()}
							>
								<div className='img-container'>
									<NcImage src={removeFirstSubdomain(product.image)} alt={product.title} width='50' height='50' />
								</div>
								<p>{product.title}</p>
							</NcLink>
						))
						.filter((product, index) => index < 5)}
				</div>
			)}
		</div>
	);
};

export default SearchProducts;
