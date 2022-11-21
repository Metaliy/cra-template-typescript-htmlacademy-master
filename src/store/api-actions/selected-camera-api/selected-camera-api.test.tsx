import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';


import { createAPI } from '../../../services/api';
import { getFakeCamera } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { fetchSelectedCameraAction} from './selected-camera-api';

const fakeCamera = getFakeCamera();

describe('Product api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchSelectedCameraAction when GET /cameras', async () => {
    mockAPI
      .onGet(`/cameras/${fakeCamera.id}`, {
      })
      .reply(200, fakeCamera);

    const store = mockStore();

    await store.dispatch(fetchSelectedCameraAction(fakeCamera.id));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchSelectedCameraAction.pending.type,
      fetchSelectedCameraAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSelectedCameraAction when GET /cameras error', async () => {
    mockAPI
      .onGet(`/cameras/${fakeCamera.id}`, {
      })
      .reply(300, fakeCamera);

    const store = mockStore();

    await store.dispatch(fetchSelectedCameraAction(1));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchSelectedCameraAction.pending.type,
      fetchSelectedCameraAction.rejected.type
    ]);
  });

});

