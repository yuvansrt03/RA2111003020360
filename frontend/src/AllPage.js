import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNubmer, setPageNumber] = useState(1);
  const navigate = useNavigate();
  async function getPageProducts() {
    let response = await fetch(
      `http://localhost:3000/categories/Laptop/products/50/page?pageNumber=${pageNubmer}`
    );
    let data = await response.json();
    setPageNumber((data) => data + 1);
    console.log(data);
    if (data) {
      setIsLoading(false);
      setProducts(data);
    } else setIsLoading((state) => false);
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    async function getProducts() {
      let response = await fetch(
        "http://localhost:3000/categories/Laptop/products/50"
      );
      let data = await response.json();
      console.log(data);
      if (data) {
        setIsLoading(false);
        setProducts(data);
      } else setIsLoading((state) => false);
    }
    getProducts();
  }, []);
  const handleClick = (data) => {
    let id = data.productName.split(" ")[1];
    navigate(`/${id}`, { state: data });
  };
  const handleNext = async () => {
    setIsLoading(true);
    await getPageProducts();
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-6xl font-bold ">Products</div>
      {isLoading ? (
        <div>IsLoading</div>
      ) : (
        products.map((ele) => {
          return (
            <div
              className={`w-full m-5 p-5 border cursor-pointer ${
                ele.availability == "yes" ? "bg-green-300" : "bg-red-300"
              }`}
              onClick={() => handleClick(ele)}
            >
              <div className={`flex flex-col`}>
                <h2>
                  <span className="font-bold">Product Name : </span>{" "}
                  <span>{ele.productName}</span>
                </h2>
                <h2>
                  <span className="font-bold">Product Price : </span>{" "}
                  <span>{ele.price}</span>
                </h2>
                <h2>
                  <span className="font-bold">Product Rating : </span>{" "}
                  <span>{ele.rating}</span>
                </h2>
                <h2>
                  <span className="font-bold">Product Discount : </span>{" "}
                  <span>{ele.discount}</span>
                </h2>
                <h2>
                  <span className="font-bold">Product Availability : </span>{" "}
                  <span>{ele.availability}</span>
                </h2>
              </div>
            </div>
          );
        })
      )}
      <button className="mb-10" onClick={getPageProducts}>
        Next
      </button>
    </div>
  );
}

export default AllPage;
