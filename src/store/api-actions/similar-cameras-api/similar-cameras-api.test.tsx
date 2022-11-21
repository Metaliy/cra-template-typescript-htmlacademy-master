import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';


import { createAPI } from '../../../services/api';
import { getFakeCamera, getUidCamerasList } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { fetchSimilarCamerasAction } from './similar-cameras-api';

const fakeCamera = getFakeCamera();
const fakeSimilarCamerasList = getUidCamerasList(3);

describe('Product api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should dispatch fetchSimilarCamerasAction when GET /cameras/:id/similar', async () => {
    mockAPI
      .onGet(`/cameras/${fakeCamera.id}/similar`, {
      })
      .reply(200, fakeSimilarCamerasList);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(fakeCamera.id));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarCamerasAction when GET /cameras/:id/similar error', async () => {
    mockAPI
      .onGet(`/cameras/${fakeCamera.id}/similar`, {
      })
      .reply(300, fakeSimilarCamerasList);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(1));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.rejected.type
    ]);
  });

});

