import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";

const App = () => {
  const [count, setCount] = useState(10);
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  console.log({ API_ENDPOINT });
  return (
    <div>
      <h1>API call & Redux</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
