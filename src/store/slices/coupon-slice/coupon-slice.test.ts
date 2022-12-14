import { LoadingStatus } from '../../../consts/const';
import { CouponSliceType } from '../../../types/state-types';
import { postCouponAction } from '../../api-actions/coupon-api/coupon-api';
import { couponInitialState, couponSlice } from './coupon-slice';

describe('Reducer test: basket-slice', () => {
  let mockState: CouponSliceType;
  let mockStateFulfilled: CouponSliceType;

  beforeEach(() => {
    mockState = {
      discountPercentage: 0,
      couponStatus: LoadingStatus.Initial,
      couponName: null,
    };
  });

  beforeEach(() => {
    mockStateFulfilled = {
      discountPercentage: 0,
      couponStatus: LoadingStatus.Fulfilled,
      couponName: null,
    };
  });

  it('return initial state', () => {
    expect(couponSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });


  describe('postCouponAction test', () => {
    it('Update couponStatus to rejected if postCouponAction is rejected',
      () => {
        expect(couponSlice.reducer(mockState, {
          type: postCouponAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            couponStatus: LoadingStatus.Rejected,
          });
      });

    it('Should update couponStatus, discountPercentage, couponName with given mock data, update couponStatus to fulfilled if postCouponAction is fulfilled',
      () => {
        expect(couponSlice.reducer(mockState, {
          payload: {percentage: 15,
            coupon: 'camera-333'},
          type: postCouponAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            couponStatus: LoadingStatus.Fulfilled,
            discountPercentage: 15,
            couponName: 'camera-333'
          });
      });
    it('Update addedItems if dispatched addedOnBasketItems',
      () => {
        expect(couponSlice.reducer(mockStateFulfilled, couponInitialState()))
          .toEqual({
            ...mockStateFulfilled,
            couponStatus: LoadingStatus.Initial
          });
      });
  });
});
