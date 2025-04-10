// // components/navbar/common/SearchBar.tsx
// import React from "react";
// import { Search } from "react-feather";

// const SearchBar: React.FC<{ placeholder: string }> = ({ placeholder }) => (
//   <div className="relative rounded-full bg-gray-200 mb-6 flex items-center">
//     <input
//       type="search"
//       placeholder={placeholder}
//       className="bg-transparent w-full text-sm py-3 pl-4 pr-12 rounded-full focus:outline-none text-gray-800"
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
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, className = "" }) => (
  <div className={`relative rounded-full bg-gray-200 flex items-center ${className}`}>
    <input
      type="search"
      placeholder={placeholder}
      className="bg-transparent w-full text-sm py-3 pl-4 pr-12 rounded-full focus:outline-none text-gray-800"
    />
    <button className="absolute right-1 bg-[#8500a0] p-2 rounded-full">
      <Search className="text-white w-4 h-4" />
    </button>
  </div>
);

export default SearchBar;