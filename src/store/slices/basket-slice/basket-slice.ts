import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../../consts/const';
import { BasketSliceType } from '../../../types/state-types';
import { postCouponAction } from '../../api-actions/coupon-api/coupon-api';
import { postCameraOrderAction } from '../../api-actions/order-api/order-api';

const initialState: BasketSliceType = {
  addedItems: [],
  numberOfItemsAdded: 0,
  discountPercentage: '0',
  couponStatus: LoadingStatus.Initial,
  couponName: null,
  orderSentStatus: LoadingStatus.Initial
};

export const basketSlice = createSlice ({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addedOnBasketItems: (state, action) => {
      const addedCamera = state.addedItems.find((item) => item.camera.id === action.payload.camera.id);
      if(addedCamera) {
        addedCamera.camerasCount = addedCamera.camerasCount + action.payload.camerasCount;
        return;
      }
      if(!addedCamera) {
        state.addedItems.push(action.payload);
      }
    },
    addedItemsCount: (state) => {
      const initialValue = 0;
      state.numberOfItemsAdded = state.addedItems.reduce((accumulator, currentValue) => accumulator + currentValue.camerasCount, initialValue);
    },
    addedItemsCounters: (state, action) => {
      const changedItem = state.addedItems.find((item) => item.camera.id === action.payload.id);
      if(action.payload.isPlus && changedItem && changedItem.camerasCount <= 99) {
        changedItem.camerasCount = changedItem.camerasCount + 1;
      }
      if(action.payload.isMinus && changedItem && changedItem.camerasCount >= 1) {
        changedItem.camerasCount = changedItem.camerasCount - 1;
      }
    },
    removedCamera: (state, action) => {
      state.removedCamera = action.payload;
    },
    removedItemConfirm: (state, action) => {
      const removedItemIndex = state.addedItems.findIndex((item) => item.camera.id === action.payload);
      state.addedItems.splice(removedItemIndex, 1);
    },
    basketInitialState: (state) => {
      state.addedItems = [];
      state.numberOfItemsAdded = 0;
      state.discountPercentage = '0';
      state.couponStatus = LoadingStatus.Initial;
      state.couponName = null;
      state.orderSentStatus = LoadingStatus.Initial;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.couponStatus = LoadingStatus.Fulfilled;
        state.discountPercentage = action.payload.percentage;
        state.couponName = action.payload.coupon;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.couponStatus = LoadingStatus.Rejected;
      })
      .addCase(postCameraOrderAction.rejected, (state) => {
        state.orderSentStatus = LoadingStatus.Rejected;
      })
      .addCase(postCameraOrderAction.fulfilled, (state) => {
        state.orderSentStatus = LoadingStatus.Fulfilled;
      });
  }
});

export const {addedOnBasketItems, addedItemsCount, addedItemsCounters, removedCamera, removedItemConfirm, basketInitialState} = basketSlice.actions;
