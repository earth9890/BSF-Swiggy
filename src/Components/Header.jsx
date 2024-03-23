import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Modal from "../Cards/Modal"; // Import the Modal component from the correct path
import { fetchProductByName } from "../Utils/API";
function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Changed variable name
  const [modalOpen, setModalOpen] = useState(false);

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    seachForProduct();
  }
};
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const seachForProduct = async () => {
    const search = searchQuery;
    const data = await fetchProductByName(searchQuery);
    setSearchResults(data.meals || []);

    // If there are search results, directly open the modal with the first search result
    if (data.meals && data.meals.length > 0) {
      handleMealClick(data.meals[0]);
    }
  };

  const handleMealClick = (meal) => {
    setSelectedProduct(meal); // Updated function and variable name
    setModalOpen(true); // Open modal when a meal is clicked
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false); // Close modal
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-8 bg-white-800 text-white">
        <div className="mb-4 md:mb-0">
          <img
            src={
              "https://startuparticle.com/wp-content/uploads/2019/11/swiggy-2.jpg"
            }
            alt="Logo"
            className="h-24 md:h-24"
          />
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Love in a Food"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="text-sm pl-2 pr-10 py-2.5 rounded-lg border-none focus:outline-none focus:ring focus:ring-blue-500 bg-gray-200 text-gray-500 w-full md:w-80 lg:w-96" // Adjusted width here
          />
          <button
            onClick={seachForProduct}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            <FiSearch />
          </button>
        </div>
      </div>

      {/* Modal for displaying detailed information */}

      {modalOpen && selectedProduct && (
        <Modal onClose={closeModal} product={selectedProduct} />
      )}
    </div>
  );
}

export default Header;
