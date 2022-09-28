import {CameraType} from './server-data-types';
import { store } from '../store/index.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CameraDataType = {
  cameras: CameraType[],
  isCamerasListLoading: boolean
}
