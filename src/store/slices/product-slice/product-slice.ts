import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../consts/const';
import { ProductSliceType } from '../../../types/state-types';

const initialState: ProductSliceType = {
  reviewModalOpenedStatus: false
};

export const productSlice = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {
    reviewModalOpenedStatus: (state, action) => {
      state.reviewModalOpenedStatus = action.payload;
    }
  }
});

export const {reviewModalOpenedStatus} = productSlice.actions;
