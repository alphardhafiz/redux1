import React from "react";

const FilterSort = ({ setFilterBy, setSortBy }) => {
  return (
    <div className="flex gap-10 w-full">
      <div className="flex flex-col w-full">
        <label
          htmlFor="countries"
          className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >
          Filter By Category
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="all">Choose Category</option>
          <option value="men's clothing">men's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label
          htmlFor="countries"
          className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >
          Sort By
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSortBy(+e.target.value)}
        >
          <option value={0}>Sort By</option>
          <option value={1}>A to Z</option>
          <option value={2}>Z to A</option>
          <option value={3}>Highest Price</option>
          <option value={4}>Lowest Price</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
