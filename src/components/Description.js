import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Description() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [saved, setSaved] = useState(false);
  let savedArr = [];
  useEffect(() => {
    let savedArr = [];
    const data = localStorage.getItem("saved");
    if (data) {
      savedArr = JSON.parse(data);
    }
    setSaved(savedArr.includes(productId));
  }, [saved]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async (id) => {
    try {
      console.log("i got called");
      const response = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      const data = response.data;
      console.log(data);
      setProduct(data);
      //console.log(recipe?.recipe?.label);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSave = () => {
    if (localStorage.getItem("saved")) {
      savedArr = JSON.parse(localStorage.getItem("saved"));
    }

    if (!saved) {
      savedArr.push(productId);
      localStorage.setItem("saved", JSON.stringify(savedArr));
      setSaved(true);
    } else {
      let index = savedArr.indexOf(productId);
      savedArr.splice(index, 1);
      localStorage.setItem("saved", JSON.stringify(savedArr));
      setSaved(false);
    }
  };
  return (
    <div class="container mt-4">
      <div class="row d-flex justify-content-center align-items-center ">
        <div class="col-md-7 d-flex justify-content-center align-items-center">
          <div class="card shadow mt-4" style={{ maxWidth: "400px" }}>
            <img
              style={{
                display: "inline-block",
                maxHeight: "300px",
                maxWidth: "400px",
              }}
              src={product.thumbnail}
              class="card-img-top"
              alt="Product Image"
            />
            <div class="card-body">
              <div className="container">
                <div className="row">
                  <h5 class="card-title"> {product.title}</h5>
                  <p class="card-text">description: {product.description}</p>
                  <p class="card-text">Price: ${product.price}</p>
                  <p class="card-text">
                    Discount: {product.discountPercentage}%
                  </p>
                  <p class="card-text">Brand: {product.brand}</p>

                  <div className="col">
                    <p class="card-text">Rating: {product.rating}*</p>
                    <p class="card-text">In Stock: {product.stock}</p>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center">
                    <button
                      onClick={handleSave}
                      className="btn btn-outline-primary w-75">
                      {saved ? "remove" : "save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
