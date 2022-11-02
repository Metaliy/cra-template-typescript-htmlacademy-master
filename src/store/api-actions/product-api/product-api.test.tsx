import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';


import { createAPI } from '../../../services/api';
import { getFakeCamera, getFakeCamerasReview, getFakePostedReview, getUidCamerasList } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { fetchCamerasReviewsAction, fetchSelectedCameraAction, fetchSimilarCamerasAction, postCameraReview } from './product-api';

const fakeCamera = getFakeCamera();
const fakeSimilarCamerasList = getUidCamerasList(3);
const fakeReviewsList = [getFakeCamerasReview(), getFakeCamerasReview(), getFakeCamerasReview()];
const fakeReview = getFakeCamerasReview();
const fakePostedReview = getFakePostedReview();

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

  it('should dispatch postCameraReview when POST /reviews', async () => {
    mockAPI
      .onPost('/reviews', fakePostedReview)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postCameraReview(fakePostedReview));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      postCameraReview.pending.type,
      postCameraReview.fulfilled.type
    ]);
  });

  it('should dispatch postCameraReview when POST /reviews error', async () => {
    mockAPI
      .onPost('/reviews', fakePostedReview);

    const store = mockStore();

    await store.dispatch(postCameraReview(fakeReview));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      postCameraReview.pending.type,
      postCameraReview.rejected.type
    ]);
  });
});

