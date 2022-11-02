import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts/const';
import { catalogData } from './catalog-data/catalog-data';
import { catalogProcess } from './catalog-process/catalog-process';
import { productData } from './product-data/product-data';
import { productProcess } from './product-process/product-process';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.CatalogProcess]: catalogProcess.reducer,
  [NameSpace.ProductData]: productData.reducer,
  [NameSpace.ProductProcess]: productProcess.reducer
});

