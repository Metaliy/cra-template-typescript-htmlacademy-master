import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/const';
import { ProductSliceType } from '../../types/state-types';

const initialState: ProductSliceType = {
  reviewModalOpenedStatus: false
};

export const productSlice = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setReviewModalOpenedStatus: (state, action) => {
      state.reviewModalOpenedStatus = action.payload;
    }
  }
});

export const {setReviewModalOpenedStatus} = productSlice.actions;
