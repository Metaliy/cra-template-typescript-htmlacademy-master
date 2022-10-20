import { NameSpace } from '../../consts/const';
import { CameraType, PromoCameraType, ReviewType } from '../../types/server-data-types';
import { State } from '../../types/state-types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.Cameras].cameras;

export const getCamerasListLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isCamerasListLoading;

export const getPromoCamera = (state: State): PromoCameraType => state[NameSpace.Cameras].promoCamera;

export const getPromoCameraListLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isPromoCameraLoading;

export const getSelectedCamera = (state: State): CameraType => state[NameSpace.Cameras].selectedCamera;

export const getSelectedCameraLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isSelectedCameraLoading;

export const getSimilarCameras = (state: State): CameraType[] => state[NameSpace.Cameras].similarCameras;

export const getSimilarCamerasListLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isSimilarCamerasLoading;

export const getReviewsList = (state: State): ReviewType[] => state[NameSpace.Cameras].reviewsList;

export const getReviewsListLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].isReviewsListLoading;
