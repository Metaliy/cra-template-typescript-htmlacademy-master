import { LoadingStatus, NameSpace } from '../../../consts/const';
import { PromoCameraType } from '../../../types/server-data-types';
import { State } from '../../../types/state-types';


export const getPromoCamera = (state: State): PromoCameraType => state[NameSpace.Promo].promoCamera;

export const getPromoCameraLoadingStatus = (state: State): LoadingStatus => state[NameSpace.Promo].promoCameraLoadingStatus;
