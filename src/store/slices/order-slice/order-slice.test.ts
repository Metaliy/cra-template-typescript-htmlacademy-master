import { LoadingStatus } from '../../../consts/const';
import { OrderSliceType } from '../../../types/state-types';
import { postCameraOrderAction } from '../../api-actions/order-api/order-api';
import { orderInitialState, orderSlice } from './order-slice';


describe('Reducer test: basket-slice', () => {
  let mockState: OrderSliceType;
  let mockStateFulfilled: OrderSliceType;


  beforeEach(() => {
    mockState = {
      orderSentStatus: LoadingStatus.Initial,
    };
  });

  beforeEach(() => {
    mockState = {
      orderSentStatus: LoadingStatus.Fulfilled,
    };
  });


  describe('postCameraOrderAction test', () => {
    it('Update orderSentStatus to rejected if postCouponAction is rejected',
      () => {
        expect(orderSlice.reducer(mockState, {
          type: postCameraOrderAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            orderSentStatus: LoadingStatus.Rejected,
          });
      });

    it('Should update orderSentStatus with given mock data, update orderSentStatus to fulfilled if postCouponAction is fulfilled',
      () => {
        expect(orderSlice.reducer(mockState, {
          type: postCameraOrderAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            orderSentStatus: LoadingStatus.Fulfilled
          });
      });

    it('Update addedItems if dispatched addedOnBasketItems',
      () => {
        expect(orderSlice.reducer(mockStateFulfilled, orderInitialState()))
          .toEqual({
            ...mockStateFulfilled,
            orderSentStatus: LoadingStatus.Initial
          });
      });
  });
});


