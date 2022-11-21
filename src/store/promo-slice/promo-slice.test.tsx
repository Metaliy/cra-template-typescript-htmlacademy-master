import { LoadingStatus } from '../../consts/const';
import { getFakePromoCamera } from '../../mock/mock';
import { PromoCameraType } from '../../types/server-data-types';
import { PromoSliceType } from '../../types/state-types';
import { fetchPromoCameraAction } from '../api-actions/promo-api/promo-api';
import { promoSlice } from './promo-slice';

const fakePromoCamera = getFakePromoCamera();

describe('Reducer test: catalogData', () => {
  let mockState: PromoSliceType;


  beforeEach(() => {
    mockState = {
      promoCamera: {} as PromoCameraType,
      promoCameraLoadingStatus: LoadingStatus.Initial
    };
  });

  it('return initial state', () => {
    expect(promoSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchPromoCameraAction test', () => {
    it('should update cameras with given mock data, update promoCameraLoadingStatus to fulfilled if fetchPromoCameraAction is fulfilled',
      () => {
        expect(promoSlice.reducer(mockState, {
          payload: fakePromoCamera,
          type: fetchPromoCameraAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            promoCamera: fakePromoCamera,
            promoCameraLoadingStatus: LoadingStatus.Fulfilled,
          });
      });

    it('Update camerasListLoadingStatus to pending if fetchCamerasAction is pending',
      () => {
        expect(promoSlice.reducer(mockState, {
          type: fetchPromoCameraAction.pending.type
        }))
          .toEqual({
            ...mockState,
            promoCameraLoadingStatus: LoadingStatus.Pending
          });
      });

    it('Update camerasListLoadingStatus to rejected if fetchCamerasAction is rejected',
      () => {
        expect(promoSlice.reducer(mockState, {
          type: fetchPromoCameraAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            promoCameraLoadingStatus: LoadingStatus.Rejected
          });
      });

  });

});

