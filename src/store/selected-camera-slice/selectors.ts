import { LoadingStatus, NameSpace } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';
import { State } from '../../types/state-types';

export const getSelectedCamera = (state: State): CameraType => state[NameSpace.SelectedCamera].selectedCamera;

export const getSelectedCameraLoadingStatus = (state: State): LoadingStatus => state[NameSpace.SelectedCamera].selectedCameraLoadingStatus;
