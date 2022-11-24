import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';
import { getUidCamerasList } from '../../../mock/mock';
import { State } from '../../../types/state-types';
import { fetchCamerasAction } from './cameras-api';
import { CAMERAS_ON_PAGE, QueryParameter, SortOrderParameter, SortTypeParameter } from '../../../consts/const';

const mockCameras = getUidCamerasList(1);
const currentPage = 1;

describe('Cameras api', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet('/cameras', {
        params: {
          [QueryParameter.Page] : currentPage,
          [QueryParameter.SortType] : SortTypeParameter.Price,
          [QueryParameter.Order] : SortOrderParameter.LowToHigh,
          [QueryParameter.Limit] : CAMERAS_ON_PAGE,
          [QueryParameter.PriceMin] : '1',
          [QueryParameter.PriceMax] : '99999999999',
          [QueryParameter.Category] : ['Фотоаппарат'],
          [QueryParameter.Type] : ['Цифровая'],
          [QueryParameter.Level] : ['Нулевой'],
        }
      })
      .reply(200, mockCameras, {
        'x-total-count': 1
      });

    const store = mockStore();

    await store.dispatch(fetchCamerasAction({
      currentPage: 1,
      sort: {
        sortType: SortTypeParameter.Price,
        order: SortOrderParameter.LowToHigh
      },
      filters: {
        priceMin: '1',
        priceMax: '99999999999',
        category: ['Фотоаппарат'],
        filterType: ['Цифровая'],
        level: ['Нулевой']
      }
    }));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCamerasAction when GET /cameras error', async () => {
    mockAPI
      .onGet(`/cameras?_page=${currentPage}&_limit=${CAMERAS_ON_PAGE}`, {
      })
      .reply(300, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction({
      currentPage: 2,
      sort: {
        sortType: SortTypeParameter.Price,
        order: SortOrderParameter.LowToHigh
      },
      filters: {
        priceMin: '1',
        priceMax: '99999999999',
        category: ['Фотоаппарат'],
        filterType: ['Цифровая'],
        level: ['Нулевой']
      }
    }));

    const actions = store.getActions().map(({type}) => type);


    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.rejected.type
    ]);
  });

});
