import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts/const';
import { camerasData } from './camera-data/camera-data';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasData.reducer
});

