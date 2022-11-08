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
    currenCatalogPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const {currenCatalogPage} = catalogSlice.actions;
