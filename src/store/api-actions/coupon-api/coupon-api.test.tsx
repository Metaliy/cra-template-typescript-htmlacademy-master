import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state-types';
import { PostCouponActionType } from '../../../types/server-data-types';
import { postCouponAction } from './coupon-api';

const fakeCoupon: PostCouponActionType = {
  coupon: 'camera-444'
};


describe('Coupon api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should dispatch postCouponAction when POST /coupons', async () => {
    mockAPI
      .onPost('/coupons', fakeCoupon)
      .reply(200, 25);

    const store = mockStore();

    await store.dispatch(postCouponAction(fakeCoupon));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postCouponAction.pending.type,
      postCouponAction.fulfilled.type
    ]);
  });


  it('should dispatch postCouponAction when POST /coupons error', async () => {
    mockAPI
      .onPost('/coupons', fakeCoupon);

    const store = mockStore();

    await store.dispatch(postCouponAction(fakeCoupon));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      postCouponAction.pending.type,
      postCouponAction.rejected.type
    ]);
  });
});
