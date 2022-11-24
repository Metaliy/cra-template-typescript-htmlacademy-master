import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';


import { createAPI } from '../../../services/api';
import { getFakeCamera, getUidCamerasList } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { fetchSearchedCamerasAction } from './searched-cameras-api';

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


  it('should dispatch fetchSearchedCamerasAction when GET /cameras/:id/similar', async () => {
    mockAPI
      .onGet(`/cameras?name_like=${fakeCamera.name}`, {
      })
      .reply(200, [fakeCamera.name]);

    const store = mockStore();

    await store.dispatch(fetchSearchedCamerasAction(fakeCamera.name));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchSearchedCamerasAction.pending.type,
      fetchSearchedCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSearchedCamerasAction when GET /cameras/:id/similar error', async () => {
    mockAPI
      .onGet(`/cameras/${fakeCamera.id}/similar`, {
      })
      .reply(300, fakeSimilarCamerasList);

    const store = mockStore();

    await store.dispatch(fetchSearchedCamerasAction('random_name'));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchSearchedCamerasAction.pending.type,
      fetchSearchedCamerasAction.rejected.type
    ]);
  });

});

