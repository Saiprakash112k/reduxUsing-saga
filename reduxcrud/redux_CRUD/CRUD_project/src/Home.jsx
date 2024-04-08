import React, { useEffect, useState } from "react";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
} from "./store/Types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setproductId] = useState("");
  const [edit, setEdit] = useState(false);

  const getAllProducts = () => {
    dispatch({ type: "product/setLoaderTrue" });
    dispatch({ type: GET_ALL_PRODUCTS });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSaveData = (e) => {
    e.preventDefault();
    dispatch({ type: "product/setLoaderTrue" });

    const data = {
      product_name: name,
      product_desc: desc,
      product_price: price,
      is_active: true,
    };

    console.log(data);
    dispatch({ type: CREATE_PRODUCT, payload: data });
  };

  const handleEditData = (e) => {
    e.preventDefault();
    dispatch({ type: "product/setLoaderTrue" });

    const data = {
      product_name: name,
      product_desc: desc,
      product_price: price,
      is_active: true,
    };

    let payload = {
      id: productId,
      data: data,
    };

    dispatch({ type: UPDATE_PRODUCT, payload: payload });

    setName("");
    setDesc("");
    setPrice("");
    setproductId("");
    setEdit(false);
  };

  const { loader, products } = useSelector((state) => state.ProductReducer);
  console.log(products,"product details in home.js")
  if (loader) {
    return <>Loading...</>;
  }

  return (
    <div className="w-100">
      <form
        onSubmit={edit ? handleEditData : handleSaveData}
        className="m-4 p-2"
      >
        <section className="m-2 pt-4">
          <div>
            <input
              type="text"
              name="product_name"
              onChange={(e) => setName(e.target.value)}
              placeholder="enter product name"
              value={name}
            />
          </div>
        </section>

        <section className="m-2 pt-2">
          <div>
            <input
              type="text"
              name="product_desc"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="enter product desc"
              value={desc}
            />
          </div>
        </section>

        <section className="m-2 pt-2">
          <div>
            <input
              type="Number"
              name="product_price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="enter product price"
              value={price}
            />
          </div>
        </section>
        <button className="btn btn-success" type="submit">
          {edit ? "Update" : "Save"}
        </button>
      </form>
      <button onClick={() => getAllProducts()}>Refresh</button>
      <table className="m-4 p-2 table table-striped table-border w-100">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((item, index) => {
              
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.product_name}</td>
                  <td>{item.product_desc}</td>
                  <td>{item.product_price}</td>
                  <td>
                    <i
                      className="fa fa-pencil m-1"
                      aria-hidden="true"
                      onClick={() => {
                        console.log(
                          "Edit button clicked",
                          item.product_name,
                          item.product_desc,
                          item.product_price
                        );
                        setName(item.product_name);
                        setDesc(item.product_desc);
                        setPrice(item.product_price);
                        setproductId(item.product_id);
                        setEdit(true);
                      }}
                    ></i>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => {
                        console.log("delete button clicked", item.product_id);
                        dispatch({ type: "product/setLoaderTrue" });
                        dispatch({
                          type: DELETE_PRODUCT,
                          payload: item.product_id,
                        });
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* {edit == true && 
                        
                        <div className="popup justify-content-center bg-red" >
                        <form onSubmit={handleSaveData} className="m-10 p-10">
      <section className="m-10 pt-10">
        <div>
          <input
            type="text"
            name="product_name"
            onChange={(e) => setName(e.target.value)}
            placeholder="enter product name"
            value={name}
            
                      />
        </div>
      </section>

      <section className="m-10 pt-10">
        <div>
          <input
            type="text"
            name="product_desc"
            onChange={(e) => setDesc(e.target.value)}
            placeholder="enter product desc"
            value={desc}
          />
        </div>
      </section>

      <section className="m-10 pt-10">
        <div>
          <input
            type="Number"
            name="product_price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="enter product price"
            value={price}
          />
        </div>
      </section>
      <button className="btn btn-success" type="submit">
        Update
      </button>
    </form>  </div>                
     

    } */}
    </div>
  );
};

export default Home;
