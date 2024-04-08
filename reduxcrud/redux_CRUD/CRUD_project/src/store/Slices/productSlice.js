import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  error: false,
  product: {},
  products: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setLoaderTrue: (state) => {
      state.loader = true;
      return state;
    },

    getAllProductSlice: (state, action) => {
      state.products = action.payload;
      state.loader = false;
      return state;
    },
    createProductSlice: (state, action) => {
      state.products = [...state.products, action.payload];
      state.loader = false;
      return state;
    },
    deleteProductSlice: (state, action) => {
      state.products = state.products.filter(
        (item) => item.product_id !== action.payload
      );
      state.loader = false;
      return state;
    },
    updateProductSlice: (state, action) => {
      
      state.products = state.products.map((product, i) =>
        product.product_id === action.payload.product_id
          ? action.payload
          : product
      );
      state.loader = false;
      return state;
    },
  },
});

export const {
  getAllProductSlice,
  setLoaderTrue,
  createProductSlice,
  deleteProductSlice,
  updateProductSlice,
} = ProductSlice.actions;
export default ProductSlice.reducer;
