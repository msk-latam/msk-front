import { Listbox } from "@headlessui/react";
import ButtonDropdown from "@/components/ButtonDropdown/ButtonDropdown";
import { ListBoxItemType } from "@/components/NcListBox/NcListBox";
import React, { FC, useState } from "react";
import FiltersApply from "./FiltersApply";
import SearchBar from "./SearchBar";
import ShowingItems from "./ShowingItems";

interface Props {
  onFilter: (selectedOption: string) => void;
  showingCount: number;
  itemsPerPage: number;
  length: number;
  filtersCount: number;
}

const filterItems = [
  { name: "Novedades", value: "novedades" },
  // { name: "Favoritos", value: "favoritos" },
  { name: "Más horas", value: "mas_horas" },
  { name: "Menos horas", value: "menos_horas" },
];
const StoreBar: FC<Props> = ({  onFilter, length, showingCount, itemsPerPage, filtersCount }) => {
  const [selectedOption, setSelectedOption] = useState("Novedades");

  const handleSelectOption = (event: { name: string; value: string }) => {
    setSelectedOption(event.name);
    onFilter(event.value);
  };
  return (
    <div className="course-bar-up-area">
      <div className="grid grid-cols-1 gap-2">
        <div className="course-main-wrapper mb-30 gap-2 xl:flex-nowrap px-0 mx-0">
          <FiltersApply filtersCount={filtersCount} />
          <SearchBar/>
          <div className="course-sidebar-tab">
            <div className="course-sidebar-wrapper">
              <ShowingItems showingCount={showingCount} length={length} />
              <Listbox
                value={"selectedOption"}
                onChange={(e: any) => handleSelectOption(e)}
              >
                <div className="relative md:min-w-[150px] store-filter-dropdown">
                  <Listbox.Button as={"div"}>
                    <ButtonDropdown>{selectedOption}</ButtonDropdown>
                  </Listbox.Button>
                  <Listbox.Options className="absolute right-0 w-36 py-1 mt-2 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-xl shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700 z-50">
                    {filterItems.map((item: ListBoxItemType, index: number) => (
                      <Listbox.Option
                        key={index}
                        className="cursor-default select-none relative py-2 pl-4 pr-4"
                        value={item}
                      >
                        {() => (
                          <>
                            <span className="font-normal block truncate">
                              {item.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBar;
