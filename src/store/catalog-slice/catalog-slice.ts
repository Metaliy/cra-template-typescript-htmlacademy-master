import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/const';
import { CatalogSliceType } from '../../types/state-types';

const initialState: CatalogSliceType = {
  currentPage: 1
};

export const catalogSlice = createSlice ({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const {changePage} = catalogSlice.actions;
