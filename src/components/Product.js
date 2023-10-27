import axios from "axios";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import "./product.css";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [search, setsearch] = useState("");
  const [products, setproducts] = useState([]);
  const navigate = useNavigate(null);
  const getProducts = async () => {
    try {
      console.log("i got called");
      const response = await axios.get(`https://dummyjson.com/products`);
      const data = response.data.products;
      console.log(data);
      if (search.length === 0) {
        setproducts(data);
        return;
      }
      if (search.length > 0) {
        const filtered = data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        setproducts(filtered);
        return;
      }

      //console.log(Product?.Product?.label);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      getProducts();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  useEffect(() => {
    getProducts();
  }, []);
  const handleDescription = (id) => {
    console.log(`handle discription got called`);

    navigate(`/description/${id}`);
  };
  return (
    <>
      <Search setsearch={setsearch} />
      <hr />
      {products.length === 0 && (
        <div className="container position-relative ">
          <div
            className="alert alert-primary absolute text-center"
            role="alert">
            Your search did not match to any product.
          </div>
        </div>
      )}

      <div className="container ">
        <div className="row">
          {products.map((item) => (
            <div
              className="col-md-6 col-lg-4 col-sm-6 shadow "
              style={{ boxSizing: "border-box" }}>
              <div className="card m-2">
                <div
                  className="card-img-zoom "
                  onClick={() => handleDescription(item.id)}>
                  <img
                    style={{ display: "inline-block", height: "350px" }}
                    src={item.thumbnail}
                    className="card-img-top"
                    alt="Image 1"
                  />
                </div>
                <div className="card-body" style={{ height: "100px" }}>
                  <div className="row">
                    <div className="col text-center">
                      <h5 className="card-title text-center">{item.title}</h5>
                      <p className="card-text text-center">
                        Price: ${item.price}
                      </p>
                    </div>
                    <div className="col  d-flex justify-content-center align-items-center ">
                      <button
                        className="btn btn-outline-success w-75 "
                        onClick={() => handleDescription(item.id)}>
                        view
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
