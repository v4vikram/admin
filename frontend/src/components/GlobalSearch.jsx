import { Search } from "lucide-react";
import React from "react";

const GlobalSearch = ({gridRef}) => {

    // search
  const handleSearch = (e) => {
    gridRef.current.api.setGridOption("quickFilterText", e.target.value);
  };
  return (
    <div className="relative w-full md:w-64 ml-auto">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        className="w-full border text-font-200 border-border-gray rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-hover-bg"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-icon-gray pointer-events-none" />
    </div>
  );
};

export default GlobalSearch;
