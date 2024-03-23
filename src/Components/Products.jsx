import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  fetchProductsByCountry,
  fetchCountryList,
} from "../Utils/API";
import ProductCard from "../Cards/ProductCard.jsx";
import Modal from "../Cards/Modal.jsx";
import Pagination from "../Cards/Pagination";
import ButtonCard from "../Cards/ButtonCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data.meals || []);
      const countriesList = await fetchCountryList();
      setCountries(countriesList);
    };

    fetchData();

    // Event listener to update windowWidth state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSortChange = (value) => {
    setSortBy(value);
    if (value === "rating") {
      // Sort by rating
      const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
      setProducts(sortedProducts);
    } else if (value === "alphabetically") {
      // Sort alphabetically
      const sortedProducts = [...products].sort((a, b) =>
        a.strMeal.localeCompare(b.strMeal)
      );
      setProducts(sortedProducts);
    } else {
      // Default sorting
      setProducts([...products]); // Reset to original order
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    if (country === "All") {
      const data = await fetchProducts();
      setProducts(data.meals || []);
      setSortBy(null);
    } else {
      const data = await fetchProductsByCountry(country);
      setProducts(data.meals || []);
    }
    setCurrentPage(1); // Reset pagination to the first page
  };

  return (
    <>
      <div>
        <h1 className="text-black-400 font-bold pl-4">
          Restaurants with online food delivery in Pune
        </h1>
      </div>
      <div className="relative pl-1 mt-2 sm:pl-2">
        <div className="flex flex-wrap items-center pl-6 sm:pl-0">
          {/* Filters Button */}
          <button
            className="bg-white hover:bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-full shadow-md mb-2 sm:mb-0 mr-2 sm:mr-4 flex items-center"
            onClick={() => setShowFilter(!showFilter)}
          >
            <span>Filters</span>
            <svg
              className="fill-current h-4 w-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.293 14.707a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 12.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showFilter && (
            <div className="absolute top-12 left-0 z-10 bg-white border border-gray-300 p rounded-full shadow">
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-300 px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  <option value="All">All</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.strArea}>
                      {country.strArea}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 14.707a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 12.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5zM5 6a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              className="bg-white hover:bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded-full shadow-md mb-2 sm:mb-0 mr-2 sm:mr-4 flex items-center"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <span>Sort</span>
              <svg
                className="fill-current h-4 w-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 14.707a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 12.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {showSortDropdown && (
              <div className="absolute mt-2 w-48 rounded-md bg-white border border-gray-300 shadow-lg z-10">
                <div className="py-1">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      handleSortChange("rating");
                      setShowSortDropdown(false);
                    }}
                  >
                    Rating
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      handleSortChange("alphabetically");
                      setShowSortDropdown(false);
                    }}
                  >
                    Alphabetically
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Conditional rendering of ButtonCards based on screen size */}
          {windowWidth >= 640 && (
            <>
              <ButtonCard name={`Fast Delivery`} />
              <ButtonCard name={`New on Swiggy`} />
              <ButtonCard name={`Ratings 4.0+`} />
              <ButtonCard name={`Pure Veg`} />
              <ButtonCard name={`Offers`} />
              <ButtonCard name={`Rs.300-Rs.600`} />
              <ButtonCard name={`Less than Rs.300`} />
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {currentProducts.map((product) => (
          <div key={product.idMeal} onClick={() => handleProductClick(product)}>
            <ProductCard product={product} rating={product.rating}  />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />

      {modalOpen && selectedProduct && (
        <Modal onClose={handleCloseModal} product={selectedProduct} />
      )}
    </>
  );
}

export default ProductList;
