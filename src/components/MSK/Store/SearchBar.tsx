import React, { FC } from "react";
import { useStoreFilters } from "@/context/storeFilters/StoreProvider";
const SearchBar: FC = () => {
  let {storeFilters, addFilter, removeFilter} = useStoreFilters();
  function handleSearch( event: React.ChangeEvent<HTMLInputElement>){
    console.log('updating store filters SEARCH');
    if (event.target.value){
      addFilter('search', event.target.value);
    }else{
      removeFilter('search', '');
    }
    console.log('store filters', storeFilters);
  }
  return (
    <div className="corse-bar-wrapper grid-area-search">
      <div className="bar-search ">
        <form action="#">
          <div className="bar-search-icon">
            <i className="flaticon-search"></i>
            <input
              id="store-search"
              type="text"
              placeholder="Buscar"
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="far fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
