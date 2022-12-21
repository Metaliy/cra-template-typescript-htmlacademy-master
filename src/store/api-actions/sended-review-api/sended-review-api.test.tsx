import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { getFakeCamerasReview, getFakePostedReview } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { postCameraReviewAction } from './sended-review-api';

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


  it('should dispatch postCameraReviewAction when POST /reviews', async () => {
    mockAPI
      .onPost('/reviews', fakePostedReview)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postCameraReviewAction(fakePostedReview));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      postCameraReviewAction.pending.type,
      postCameraReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch postCameraReviewAction when POST /reviews error', async () => {
    mockAPI
      .onPost('/reviews', fakePostedReview);

    const store = mockStore();

    await store.dispatch(postCameraReviewAction(fakeReview));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      postCameraReviewAction.pending.type,
      postCameraReviewAction.rejected.type
    ]);
  });
});

