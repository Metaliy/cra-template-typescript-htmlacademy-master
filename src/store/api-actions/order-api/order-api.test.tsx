import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state-types';
import { postCameraOrderAction } from './order-api';

const fakeOrderCamerasListCamera = {
  camerasIds: [1, 2, 3, 4],
  coupon: 'coupon-333'
};

const fakeIncorrectOrderCamerasListCamera = {
  camerasIds: [],
  coupon: ''
};


describe('Order api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should dispatch postCameraOrderAction when POST /orders', async () => {
    mockAPI
      .onPost('/orders', fakeOrderCamerasListCamera)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postCameraOrderAction(fakeOrderCamerasListCamera));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      postCameraOrderAction.pending.type,
      postCameraOrderAction.fulfilled.type
    ]);
  });

  it('should dispatch postCameraOrderAction when POST /orders error', async () => {
    mockAPI
      .onPost('/orders', fakeOrderCamerasListCamera);

    const store = mockStore();

    await store.dispatch(postCameraOrderAction(fakeIncorrectOrderCamerasListCamera));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      postCameraOrderAction.pending.type,
      postCameraOrderAction.rejected.type
    ]);
  });
});

