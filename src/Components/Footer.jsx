import React from "react";

function Footer() {
  return (
    <>
      <div className="bg-black flex flex-col items-center justify-start p-4 w-full">
        <div>
          <img
            src={
              "https://5.imimg.com/data5/ANDROID/Default/2021/5/EZ/FT/GZ/130133306/product-jpeg.jpg"
            }
            alt="Logo"
            className="h-14 pl-18"
          />
        </div>
        <div className="text-gray-500 text-sm ml-2">
          © 2023 Bundl Technologies Pvt. Ltd
        </div>
      </div>
    </>
  );
}

export default Footer;
