import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';


import { createAPI } from '../../../services/api';
import { getUidCamerasList } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { fetchPromoCameraAction } from './promo-api';

const mockCameras = getUidCamerasList(14);

describe('Catalog api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchCamerasAction when GET /promo', async () => {
    mockAPI
      .onGet('/promo', {
      })
      .reply(200, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchPromoCameraAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoCameraAction.pending.type,
      fetchPromoCameraAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCamerasAction when GET /promo error', async () => {
    mockAPI
      .onGet('/promo', {
      })
      .reply(300, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchPromoCameraAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoCameraAction.pending.type,
      fetchPromoCameraAction.rejected.type
    ]);
  });
});

