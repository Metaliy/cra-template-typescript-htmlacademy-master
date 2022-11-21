import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';


import { createAPI } from '../../../services/api';
import { getFakeCamera, getFakeCamerasReview } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { fetchCamerasReviewsAction } from './reviews-api';

const fakeCamera = getFakeCamera();

const fakeReviewsList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];


describe('Product api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should dispatch fetchCamerasReviewsAction when GET /cameras/:id/reviews', async () => {
    mockAPI
      .onGet(`/cameras/${fakeCamera.id}/reviews`, {
      })
      .reply(200, fakeReviewsList);

    const store = mockStore();

    await store.dispatch(fetchCamerasReviewsAction(fakeCamera.id));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchCamerasReviewsAction.pending.type,
      fetchCamerasReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCamerasReviewsAction when GET /cameras/:id/reviews error', async () => {
    mockAPI
      .onGet(`/cameras/${fakeCamera.id}/reviews`, {
      })
      .reply(300, fakeReviewsList);

    const store = mockStore();

    await store.dispatch(fetchCamerasReviewsAction(1));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchCamerasReviewsAction.pending.type,
      fetchCamerasReviewsAction.rejected.type
    ]);
  });

});

