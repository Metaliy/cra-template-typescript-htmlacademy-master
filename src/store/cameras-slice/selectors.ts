import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { State } from '../../types/state-types';


export const getCameras = (state: State): CameraType[] => state[NameSpace.Cameras].cameras;

export const getCamerasListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.Cameras].isCamerasListLoading;

export const getSelectedCamera = (state: State): CameraType => state[NameSpace.Cameras].selectedCamera;

export const getSelectedCameraLoadingStatus = (state: State): LoadingStatus => state[NameSpace.Cameras].isSelectedCameraLoading;

export const getSimilarCameras = (state: State): CameraType[] => state[NameSpace.Cameras].similarCameras;

export const getSimilarCamerasListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.Cameras].isSimilarCamerasLoading;

export const getTotalCamerasCount = (state: State): number => state[NameSpace.Cameras].camerasCount;
