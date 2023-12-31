import { useContext, useEffect, useState } from "react";
import Input from "components/Input/Input";
import { CountryContext } from "context/country/CountryContext";
import { FetchCourseType } from "data/types";
import { Link, useLocation } from "react-router-dom";
import searchIcon from "../../images/icons/search.svg";
import { DataContext } from "context/data/DataContext";

const SearchProducts = () => {
  const [auxProducts, setAuxProducts] = useState<FetchCourseType[]>([]);
  const [products, setProducts] = useState<FetchCourseType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { state } = useContext(CountryContext);
  const [isOnBlog, setIsOnBlog] = useState(false);
  const { state: dataState, loadingCourses } = useContext(DataContext);
  const { allCourses, allPosts } = dataState;

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const triggerSearch = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      const filteredProducts = auxProducts.filter((product) =>
        removeAccents(product.title.toLowerCase()).includes(
          removeAccents(value.toLowerCase())
        )
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

  const clearInputValue = () => {
    setInputValue("");
  };
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/blog")) {
      setAuxProducts([...allPosts]);
      setProducts(allPosts);
      setIsOnBlog(true);
    } else {
      setAuxProducts([...allCourses]);
      setProducts(allCourses);
      setIsOnBlog(false);
    }
  }, [location.pathname, allCourses, allPosts]);

  return (
    <div className="search-products">
      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar"
          className="pr-10 w-full"
          sizeClass="h-[42px] pl-4 py-3"
          value={inputValue}
          onChange={triggerSearch}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => onBlur()}
        />
        <img src={searchIcon} className="absolute top-2 right-2" />
      </div>
      {inputValue && isInputFocused && (
        <div className="search-products-results">
          {products
            .map((product, index) => (
              <Link
                to={`/${isOnBlog ? "blog" : "curso"}/${product.slug}`}
                key={product.id}
                className="product-item"
                onClick={() => clearInputValue()} // Clear input value and update URL
              >
                <div className="img-container">
                  <img
                    src={product.image.replace(`${state.country}.`, "")}
                    alt={product.title}
                  />
                </div>
                <p>{product.title}</p>
              </Link>
            ))
            .filter((product, index) => index < 5)}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
