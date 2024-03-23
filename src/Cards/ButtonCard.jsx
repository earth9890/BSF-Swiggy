// ButtonCard.jsx

import React from "react";

function ButtonCard({ name, hiddenClass }) {
  return (
    <div
      className={`bg-white hover:bg-gray-200 text-gray-500 font-bold py-2 px-4 mt-2 rounded-full shadow-md mb-2 sm:mb-0 mr-2 sm:mr-4 flex items-center ${hiddenClass}`}
    >
      <span>{name}</span>
    </div>
  );
}

export default ButtonCard;
