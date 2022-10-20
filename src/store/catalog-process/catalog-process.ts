import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/const';
import { CatalogProcessType } from '../../types/state-types';

const initialState: CatalogProcessType = {
  currentPage: 1
};

export const catalogProcess = createSlice ({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const {changePage} = catalogProcess.actions;
