import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { getUidCamerasList } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { QueryParameter, SortOrderParameter, SortTypeParameter } from '../../../consts/const';
import { fetchMinMaxPriceCamerasAction } from './min-max-cameras-price-api';

const mockCameras = getUidCamerasList(1);

describe('Cameras api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchMinMaxPriceCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet('/cameras', {
        params: {
          [QueryParameter.SortType] : SortTypeParameter.Price,
          [QueryParameter.Order] : SortOrderParameter.LowToHigh,
          [QueryParameter.PriceMin] : String(mockCameras[0].price),
          [QueryParameter.PriceMax] : String(mockCameras[0].price),
          [QueryParameter.Category] : [mockCameras[0].category],
          [QueryParameter.Type] : [mockCameras[0].type],
          [QueryParameter.Level] : [mockCameras[0].level],
        }
      })
      .reply(200, {minPrice: mockCameras[0].price,
        maxPrice: mockCameras[0].price});

    const store = mockStore();

    await store.dispatch(fetchMinMaxPriceCamerasAction({
      priceMin:  String(mockCameras[0].price),
      priceMax: String(mockCameras[0].price),
      category: [mockCameras[0].category],
      filterType: [mockCameras[0].type],
      level: [mockCameras[0].level]
    }
    ));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMinMaxPriceCamerasAction.pending.type,
      fetchMinMaxPriceCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchMinMaxPriceCamerasAction when GET /cameras error', async () => {
    mockAPI
      .onGet('/cameras', {
      })
      .reply(300, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchMinMaxPriceCamerasAction({
      priceMin: '1',
      priceMax: '99999999999',
      category: ['Фотоаппарат'],
      filterType: ['Цифровая'],
      level: ['Нулевой']
    }));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchMinMaxPriceCamerasAction.pending.type,
      fetchMinMaxPriceCamerasAction.rejected.type
    ]);
  });

});
