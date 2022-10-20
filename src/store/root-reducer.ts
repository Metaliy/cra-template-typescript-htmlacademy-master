import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts/const';
import { camerasData } from './camera-data/camera-data';
import { catalogProcess } from './catalog-process/catalog-process';
import { reviewProcess } from './review-process/review-process';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Catalog]: catalogProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer
});

