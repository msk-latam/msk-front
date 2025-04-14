// // // components/navbar/common/SearchBar.tsx
// // import React from "react";
// // import { Search } from "react-feather";

// // const SearchBar: React.FC<{ placeholder: string }> = ({ placeholder }) => (
// //   <div className="relative rounded-full bg-gray-200 mb-6 flex items-center">
// //     <input
// //       type="search"
// //       placeholder={placeholder}
// //       className="bg-transparent w-full text-sm py-3 pl-4 pr-12 rounded-full focus:outline-none text-gray-800"
// //     />
// //     <button className="absolute right-1 bg-[#8500a0] p-2 rounded-full">
// //       <Search className="text-white w-4 h-4" />
// //     </button>
// //   </div>
// // );

// // export default SearchBar;

// // components/navbar/common/SearchBar.tsx
// import React from "react";
// import { Search } from "react-feather";

// interface SearchBarProps {
//   placeholder: string;
//   className?: string;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ placeholder, className = "" }) => (
//   <div className={`relative border-0 border-transparent focus:border-transparent focus:outline-none focus:ring-0 focus:ring-transparent  rounded-full flex items-center ${className}`}>
//     <input
//       type="search"
//       placeholder={placeholder}
//       className="bg-transparent w-full text-sm py-3 pl-4 pr-12 rounded-full focus:border-transparent border-transparent focus:outline-none focus:ring-0 focus:ring-transparent  text-gray-800"
//     />
//     <button className="absolute right-1 bg-[#8500a0] p-2 rounded-full">
//       <Search className="text-white w-4 h-4" />
//     </button>
//   </div>
// );

// export default SearchBar;

// components/navbar/common/SearchBar.tsx
import React from "react";
import { Search } from "react-feather";

interface SearchBarProps {
  placeholder: string;
  isMainView?: boolean;
  isDiscoverView?: boolean;
  isSpecialtyView?: boolean;
  isSpecialtyDetailView?: boolean;
  isInstitutionsView?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  isMainView = false,
  isDiscoverView = false,
  isSpecialtyView = false,
  isSpecialtyDetailView = false,
  isInstitutionsView = false,
  className = "",
}) => {
  const inputTextStyle =
    isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView
      ? ""
      : isInstitutionsView
      ? "text-[#838790] border-[#989ca4]"
      : "";

  return (
    <div
      className={`rounded-full border border-[#DBDDE2]-100 overflow-hidden relative flex items-center ${className}`}
    >
      <input
        type="search"
        placeholder={placeholder}
        className={`bg-transparent w-full text-sm py-3.5 pl-4 pr-12 border-transparent focus:border-transparent focus:ring-0 focus:outline-none ${inputTextStyle}`}
      />
      <button className="absolute right-1 bg-[#9200AD] p-3 rounded-full">
        <Search className="text-white w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
