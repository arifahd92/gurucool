import React from "react";
import Product from "./components/Product";
import { Route, Routes } from "react-router-dom";
import Description from "./components/Description";

export default function App() {
  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#cad4e6",
      }}>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/description/:productId" element={<Description />} />
      </Routes>
    </div>
  );
}
