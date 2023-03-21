import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import thunk from "redux-thunk";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root", //everything
  storage, // storage
  whitelist: ["cart"], // blacklist reducers
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  import.meta.env.MODE !== "production" && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (import.meta.env.MODE !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
