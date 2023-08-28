import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddlware from "redux-saga";

import rootSaga from "./sagas";

import {
  loadingReducer,
  loadingActions,
  hotelReducer,
  hotelActions,
  roomReducer,
  roomActions,
} from "./slices";

const reducer = combineReducers({
  loading: loadingReducer,
  hotel: hotelReducer,
  room: roomReducer,
});

const sagaMiddleware = createSagaMiddlware();

export const store = configureStore({
  preloadedState: {},
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      sagaMiddleware
    )
});

export const AppActions = {
  loading: loadingActions,
  hotel: hotelActions,
  room: roomActions,
};

sagaMiddleware.run(rootSaga);

export * as AppActionTypes from "./types";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;