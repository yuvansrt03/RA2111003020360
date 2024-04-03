import React from "react";
import { useLocation } from "react-router-dom";

function IndividualProduct() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-6xl font-bold">INDIVIDUAL PRODUCT</div>
      <div
        className={`w-full m-5 p-5 border ${
          data.availability == "yes" ? "bg-green-300" : "bg-red-300"
        }`}
      >
        <div className={`flex flex-col`}>
          <h2>
            <span className="font-bold">Product Name : </span>{" "}
            <span>{data.productName}</span>
          </h2>
          <h2>
            <span className="font-bold">Product Price : </span>{" "}
            <span>{data.price}</span>
          </h2>
          <h2>
            <span className="font-bold">Product Rating : </span>{" "}
            <span>{data.rating}</span>
          </h2>
          <h2>
            <span className="font-bold">Product Discount : </span>{" "}
            <span>{data.discount}</span>
          </h2>
          <h2>
            <span className="font-bold">Product Availability : </span>{" "}
            <span>{data.availability}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
