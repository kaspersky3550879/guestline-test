import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { AppActions } from "redux/store";

import { makeAPIRequst } from "utils";

import * as AppActionTypes from "../../types";

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* getHotelsRequestSaga(
  action: PayloadAction<AppActionTypes.Hotel.IGetHotelsRequestAction>
) {
  try {
    yield put(AppActions.loading.setLoading());

    const result: ResponseGenerator = yield call(async () => {
      return await makeAPIRequst(`hotels?collection-id=${"OBMNG"}`, "GET");
    });

    yield put(AppActions.loading.finishLoading());
    yield put(AppActions.hotel.getHotelsSuccess(result.data));

    if (action.payload.next) {
      action.payload.next();
    }
  } catch (error: unknown) {
    yield put(AppActions.loading.finishLoading());

    if (error instanceof AxiosError) {
      const reasonCode: string = error.request?.data.reason;
      if (reasonCode && action.payload.errors) {
        const errorHandler: () => void = action.payload.errors[reasonCode];
        errorHandler();
      }
    }
  }
}

export default (function* () {
  yield takeEvery("hotel/getHotelsRequest", getHotelsRequestSaga);
})();
