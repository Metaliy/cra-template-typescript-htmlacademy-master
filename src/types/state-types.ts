import {CameraType, PromoCameraType, ReviewType} from './server-data-types';
import { store } from '../store/index.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CameraDataType = {
  cameras: CameraType[],
  isCamerasListLoading: boolean,
  promoCamera: PromoCameraType,
  isPromoCameraLoading: boolean,
  selectedCamera: CameraType,
  isSelectedCameraLoading: boolean,
  similarCameras: CameraType[],
  isSimilarCamerasLoading: boolean,
  reviewsList: ReviewType[],
  isReviewsListLoading: boolean
}

export type CatalogProcessType = {
  currentPage: number
}

export type ReviewPostProcessType = {
  reviewSentStatus: boolean,
  reviewSentErrorStatus: boolean
}
