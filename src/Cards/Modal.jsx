import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, product }) => {
  const renderRatingStars = () => {
    const stars = [];
    const roundedRating = product.rating;
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(
          <span key={i} className="text-yellow-500">
            &#9733;
          </span> // Filled star
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            &#9733;
          </span> // Empty star
        );
      }
    }
    return stars;
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay bg-black opacity-50 fixed inset-0"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white rounded-lg shadow-lg z-50 relative w-full max-w-3xl overflow-y-auto max-h-full md:flex-row md:justify-between md:w-full">
        <div className="modal-content p-4">
          <button
            className="modal-close absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:mr-4">
              <img
                src={product.strMealThumb}
                alt={product.strMeal}
                className="w-full rounded-lg"
              />
              {product.rating && (
                <div className="flex items-center justify-left mt-4">
                  <div className="flex text-yellow-500 mr-4 md:mr-10 lg:mr-20">
                    <h1 className="text-gray-400">Ratings : </h1>
                    {renderRatingStars()}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <h2 className="text-xl text-gray-600 font-bold mb-4">{`${product.strMeal} for you`}</h2>
              <h3 className="text-lg text-gray-600 font-semibold mb-2">
                Recipe:
              </h3>

              <div className="overflow-y-auto max-h-60 mb-4">
                <p className="text-sm text-gray-700">
                  {product.strInstructions}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg text-gray-600 font-semibold mb-2">
                  Ingredients:
                </h3>
                <ul className="list-disc list-inside">
                  {Object.keys(product).map((key) => {
                    if (key.startsWith("strIngredient") && product[key]) {
                      const measureKey = key.replace(
                        "strIngredient",
                        "strMeasure"
                      );
                      return (
                        <li key={key}>
                          {product[key]} - {product[measureKey]}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
export default Modal;