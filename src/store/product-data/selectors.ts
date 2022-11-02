import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType, ReviewType } from '../../types/server-data-types';
import { State } from '../../types/state-types';

export const getSelectedCamera = (state: State): CameraType => state[NameSpace.ProductData].selectedCamera;

export const getSelectedCameraLoadingStatus = (state: State): LoadingStatus => state[NameSpace.ProductData].isSelectedCameraLoading;

export const getSimilarCameras = (state: State): CameraType[] => state[NameSpace.ProductData].similarCameras;

export const getSimilarCamerasListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.ProductData].isSimilarCamerasLoading;

export const getReviewsList = (state: State): ReviewType[] => state[NameSpace.ProductData].reviewsList;

export const getReviewsListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.ProductData].isReviewsListLoading;
