import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { State } from '../../types/state-types';

export const getSimilarCameras = (state: State): CameraType[] => state[NameSpace.SimilarCameras].similarCameras;

export const getSimilarCamerasListLoadingStatus = (state: State): LoadingStatus => state[NameSpace.SimilarCameras].similarCamerasLoadingStatus;

