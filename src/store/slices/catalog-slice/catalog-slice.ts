import { createSlice } from '@reduxjs/toolkit';
import { SortTypeParameter, SortOrderParameter, NameSpace } from '../../../consts/const';
import { CatalogSliceType } from '../../../types/state-types';

const initialState: CatalogSliceType = {
  currentPage: 1,
  sort: {
    sortType: SortTypeParameter.Price,
    order:  SortOrderParameter.LowToHigh
  },
  filters: {
    priceMin: [],
    priceMax: [],
    category: [],
    filterType: [],
    level: []
  }
};

export const catalogSlice = createSlice ({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    currenCatalogPage: (state, action) => {
      state.currentPage = action.payload;
    },
    sortType: (state, action) => {
      state.sort.sortType = action.payload;
    },
    sortOrder: (state, action) => {
      state.sort.order = action.payload;
    },
    priceMinFilter: (state, action) => {
      state.filters.priceMin = action.payload;
    },
    priceMaxFilter: (state, action) => {
      state.filters.priceMax = action.payload;
    },
    categoryFilter: (state, action) => {
      if (state.filters.category.includes(action.payload)) {
        state.filters.category = state.filters.category.filter((filter) => filter !== action.payload);
        return;
      }
      state.filters.category.push(action.payload);
    },
    typeFilter: (state, action) => {
      if (state.filters.filterType.includes(action.payload)) {
        state.filters.filterType = state.filters.filterType.filter((filter) => filter !== action.payload);
        return;
      }
      state.filters.filterType.push(action.payload);
    },
    levelFilter: (state, action) => {
      if (state.filters.level.includes(action.payload)) {
        state.filters.level = state.filters.level.filter((filter) => filter !== action.payload);
        return;
      }
      state.filters.level.push(action.payload);
    },
    filtersInitialState: (state) => {
      state.filters = initialState.filters;
      state.sort = initialState.sort;
    },
  }
});

export const {currenCatalogPage, sortType, sortOrder, priceMinFilter, priceMaxFilter, categoryFilter, typeFilter, levelFilter, filtersInitialState} = catalogSlice.actions;
