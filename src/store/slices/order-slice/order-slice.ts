import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../../consts/const';
import { OrderSliceType } from '../../../types/state-types';
import { postCameraOrderAction } from '../../api-actions/order-api/order-api';

const initialState: OrderSliceType = {
  orderSentStatus: LoadingStatus.Initial,
};

export const orderSlice = createSlice ({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    orderInitialState: (state) => {
      state.orderSentStatus = LoadingStatus.Initial;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCameraOrderAction.rejected, (state) => {
        state.orderSentStatus = LoadingStatus.Rejected;
      })
      .addCase(postCameraOrderAction.fulfilled, (state) => {
        state.orderSentStatus = LoadingStatus.Fulfilled;
      });
  }
});

export const {orderInitialState} = orderSlice.actions;
