import { all } from "redux-saga/effects";
import { watchProductSaga } from "./productSaga";

export function* watcherSaga() {
  yield all([
    watchProductSaga(),
  ]);
}
