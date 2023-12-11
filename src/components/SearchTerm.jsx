import React from "react";

const SearchTerm = ({ setSearchTerm }) => {
  return (
    <div className="mt-6">
      <label
        htmlFor="search"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Searching
      </label>
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Product...."
      />
    </div>
  );
};

export default SearchTerm;
