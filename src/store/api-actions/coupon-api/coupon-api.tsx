import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {ToastMessages } from '../../../consts/const';
import { PostCouponActionType, PostCouponReturnedActionType } from '../../../types/server-data-types';
import { AppDispatch, State } from '../../../types/state-types';


export const postCouponAction = createAsyncThunk<PostCouponReturnedActionType, PostCouponActionType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postCouponAction',
  async (coupon, {extra: api}) => {
    try {
      const {data} = await api.post('/coupons ', coupon);
      const returnedData = {
        percentage: data,
        coupon: coupon.coupon
      };
      return returnedData;
    } catch (error) {
      toast.error(ToastMessages.PostCouponError);
      throw error;
    }
  },
);
