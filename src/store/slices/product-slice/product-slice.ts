import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../consts/const';
import { ProductSliceType } from '../../../types/state-types';

const initialState: ProductSliceType = {
  isReviewModal: false
};

export const productSlice = createSlice ({
  name: NameSpace.Product,
  initialState,
  reducers: {
    reviewModal: (state, action) => {
      state.isReviewModal = action.payload;
    }
  }
});

export const {reviewModal} = productSlice.actions;
