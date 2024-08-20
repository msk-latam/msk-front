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
      const filteredProducts = auxProducts.filter(product =>
        removeAccents(product.title.toLowerCase()).includes(
          removeAccents(value.toLowerCase()),
        ),
      );
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
        //console.log('STATE: ', countryState);
        let courses;
        if (pathname?.includes('/blog')) {
          // Fetch blog posts
        } else {
          if (products.length == 0) {
            //const currentCountry = cookies().get("country")?.value;
            let productsCountry =
              countryState.country == 'int' ? '' : countryState.country;
            courses = await ssr.getStoreCourses(productsCountry, window.location.href);

            setAuxProducts(courses);
            setProducts(courses);
            setIsOnBlog(false);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [pathname]);

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
                  <NcImage
                    src={removeFirstSubdomain(product.image)}
                    alt={product.title}
                    width='50'
                    height='50'
                  />
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
