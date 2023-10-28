import axios from "axios";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import "./product.css";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [search, setsearch] = useState("");
  const [request, setRequest] = useState(true);
  const [products, setproducts] = useState([]);
  const navigate = useNavigate(null);
  const getProducts = async () => {
    try {
      console.log("i got called");
      setRequest(true);
      const response = await axios.get(`https://dummyjson.com/products`);
      const data = response.data.products;
      console.log(data);
      if (search.length === 0) {
        setproducts(data);
        setRequest(false);
        return;
      }
      if (search.length > 0) {
        const filtered = data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        setproducts(filtered);
        setRequest(false);
        return;
      }

      //console.log(Product?.Product?.label);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      setRequest(false);
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
  //handle saved
  const handleSaved = async () => {
    try {
      let savedArr = JSON.parse(localStorage.getItem("saved"));
      if (savedArr.length === 0) {
        alert("Cart is empty, view and save some items");
        return;
      }
      console.log("savedArr", savedArr);
      setRequest(true);
      setproducts([]);
      const response = await axios.get(`https://dummyjson.com/products`);
      const data = response.data.products;
      const savedItem = data.filter((item) =>
        savedArr.includes(item.id.toString())
      );
      console.log("savedItem", savedItem);
      setproducts(savedItem);
      setRequest(false);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Search setsearch={setsearch} />
      <hr />

      <div className="savedItem row position-fixed z-3 ">
        <button className="btn btn-warning" onClick={handleSaved}>
          saved items
        </button>
      </div>

      {products.length === 0 && (
        <div className="container position-relative ">
          <div
            className="alert alert-primary absolute text-center"
            role="alert">
            {request
              ? "please wait..."
              : "Your search did not match to any product."}
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
                <div className="card-body">
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
