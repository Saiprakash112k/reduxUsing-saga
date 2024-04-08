import { put, takeEvery } from "redux-saga/effects";
import {
  getAllProductSlice,
  createProductSlice,
  deleteProductSlice,
  updateProductSlice,
} from "../Slices/productSlice";
import { GET_ALL_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../Types";
import {
  getAllProductsAPI,
  createProductsAPI,
  deleteProductAPI,
  updateProductAPI,
} from "../../apis";

export function* getProductsSaga() {
  try {
    const products = yield getAllProductsAPI();
    yield put(getAllProductSlice(products?.data?.data));
  } catch (error) {
    console.error(error);
  }
}

export function* createProductSaga(action) {
  try {
    const product = yield createProductsAPI(action.payload);
    console.log({ product }, "<< from create saga");
    yield put(createProductSlice(product?.data?.data[0]));
  } catch (error) {
    console.error(error);
  }
}

export function* deleteProductSaga(action) {
  try {
    const product = yield deleteProductAPI(action.payload);
    console.log(product.data);
    yield put(deleteProductSlice(product?.data?.data[0].deleted_id));
  } catch (error) {
    console.error(error);
  }
}

export function* updateProductSaga(action) {
  try {
    const product = yield updateProductAPI(action.payload);
    console.log(product.data);
    yield put(updateProductSlice(product?.data?.data[0]));
  } catch (error) {
    console.error(error);
  }
}

export function* watchProductSaga() {
  yield takeEvery(GET_ALL_PRODUCTS, getProductsSaga);
  yield takeEvery(CREATE_PRODUCT, createProductSaga);
  yield takeEvery(DELETE_PRODUCT, deleteProductSaga);
  yield takeEvery(UPDATE_PRODUCT, updateProductSaga);
}
