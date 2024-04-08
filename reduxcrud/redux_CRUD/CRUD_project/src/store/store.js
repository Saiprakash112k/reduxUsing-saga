import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { watcherSaga } from "./Sagas/rootSaga";
import { rootReducer } from "./Reducer";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];



export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(watcherSaga);

