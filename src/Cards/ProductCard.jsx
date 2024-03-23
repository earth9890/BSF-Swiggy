import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // Import the cart icon

function ProductCard({ product, rating }) {
  const renderRatingStars = () => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 1);

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
    if (halfStar) {
      stars.push(<span key="half">&#9734;</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={i + filledStars + 1}>&#9734;</span>);
    }

    return stars;
  };

  return (
    <div className="bg-white overflow-hidden shadow">
      <img
        src={product.strMealThumb}
        alt={product.strMeal}
        className="w-full h-48 object-cover rounded-3xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.strMeal}</h3>
        <p className="text-gray-700">{product.strCategory}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex text-yellow-500 mr-4 md:mr-10 lg:mr-20">
            {renderRatingStars()}
          </div>
          <button className="bg-yellow-300 hover:bg-yellow-500 text-gray-500 font-bold py-2 px-4 rounded shadow-lg">
            <FaShoppingCart className="mr-2 size-6" /> {/* Cart icon */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
