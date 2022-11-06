import { LoadingStatus } from '../../consts/const';
import { getFakePromoCamera } from '../../mock/mock';
import { PromoCameraType } from '../../types/server-data-types';
import { PromoSliceType } from '../../types/state-types';

import { fetchPromoCameraAction } from '../api-actions/catalog-api/catalog-api';
import { promoSlice } from './promo-slice';

const fakePromoCamera = getFakePromoCamera();

describe('Reducer test: catalogData', () => {
  let mockState: PromoSliceType;


  beforeEach(() => {
    mockState = {
      promoCamera: {} as PromoCameraType,
      isPromoCameraLoading: LoadingStatus.Initial
    };
  });

  it('return initial state', () => {
    expect(promoSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchPromoCameraAction test', () => {
    it('should update cameras with given mock data, update isPromoCameraLoading to fulfilled if fetchPromoCameraAction is fulfilled',
      () => {
        expect(promoSlice.reducer(mockState, {
          payload: fakePromoCamera,
          type: fetchPromoCameraAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            promoCamera: fakePromoCamera,
            isPromoCameraLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isCamerasListLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(promoSlice.reducer(mockState, {
          type: fetchPromoCameraAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isPromoCameraLoading: LoadingStatus.Pending
          });
      });

    it('Update isCamerasListLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(promoSlice.reducer(mockState, {
          type: fetchPromoCameraAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isPromoCameraLoading: LoadingStatus.Rejected
          });
      });

  });

});

