import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from '../../../consts/const';
import { CouponSliceType } from '../../../types/state-types';
import { postCouponAction } from '../../api-actions/coupon-api/coupon-api';

const initialState: CouponSliceType = {
  discountPercentage: 0,
  couponStatus: LoadingStatus.Initial,
  couponName: null,
};

export const couponSlice = createSlice ({
  name: NameSpace.Coupon,
  initialState,
  reducers: {
    couponInitialState: (state) => {
      state.discountPercentage = 0;
      state.couponStatus = LoadingStatus.Initial;
      state.couponName = null;
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
      });
  }
});

export const {couponInitialState} = couponSlice.actions;
