import { useState, useEffect } from "react";
import { addItemToCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";
import FilterSort from "../../components/FilterSort";
import SearchTerm from "../../components/SearchTerm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsFilteredAndSortered, setProductsFilteredAndSortered] =
    useState([]);
  const [isLoading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const sortAndFilterProducts = () => {
      let filteredProducts = [...products]; // Buat salinan array produk

      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterBy !== "all") {
        // Filter products based on selected category
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filterBy
        );
      }

      switch (sortBy) {
        case 1:
          return filteredProducts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        case 2:
          return filteredProducts.sort((a, b) =>
            b.title.localeCompare(a.title)
          );
        case 3:
          return filteredProducts.sort((a, b) => b.price - a.price);
        case 4:
          return filteredProducts.sort((a, b) => a.price - b.price);
        default:
          return filteredProducts;
      }
    };

    setProductsFilteredAndSortered(sortAndFilterProducts());
  }, [sortBy, filterBy, products, searchTerm]);

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };
  return (
    <>
      <SearchTerm setSearchTerm={setSearchTerm} />
      <FilterSort setFilterBy={setFilterBy} setSortBy={setSortBy} />

      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {isLoading ? (
          <div
            aria-label="Loading..."
            role="status"
            className="flex items-center space-x-2"
          >
            <svg
              className="h-20 w-20 animate-spin stroke-gray-500"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">
              Loading...
            </span>
          </div>
        ) : (
          productsFilteredAndSortered.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border shadow p-4 w-full"
              >
                <div className="group relative w-[80%] h-[350px] mx-auto overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out"
                  />
                </div>
                <div className="flex flex-col gap-6 mt-8">
                  <button
                    type="button"
                    className="bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-lg py-3 px-8"
                    onClick={() => handleClickBuy(product)}
                  >
                    BUY NOW
                  </button>
                  <h3 className="font-bold">{product.title}</h3>
                  <h4>{product.category}</h4>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                      {product.rating.rate}
                    </p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      {product.rating.count} reviews
                    </a>
                  </div>

                  <h3>{product.price}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default ProductList;
