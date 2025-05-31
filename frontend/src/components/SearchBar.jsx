import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react"; // Or use any icon

// Sample data
const suggestionsData = [
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Watermelon",
  "Pineapple",
  "Mango",
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const filteredSuggestions = suggestionsData.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.trim().length > 0);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim()) setShowSuggestions(true);
          }}
          placeholder="Search..."
          className="w-full border text-font-200 border-border-gray rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-hover-bg"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-icon-gray pointer-events-none" />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-secondary-gray border border-border-gray rounded-lg shadow-md max-h-48 overflow-y-auto">
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-hover-bg text-font-200 cursor-pointer"
              onClick={() => {
                setQuery(item);
                setShowSuggestions(false);
              }}
            >
              {
                console.log("item", item)
              }
              {item.productName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
