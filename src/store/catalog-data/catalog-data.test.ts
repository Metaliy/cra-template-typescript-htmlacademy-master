import { LoadingStatus } from '../../consts/const';
import { getFakePromoCamera, getUidCamerasList } from '../../mock/mock';
import { PromoCameraType } from '../../types/server-data-types';
import { CatalogDataType } from '../../types/state-types';
import { fetchCamerasAction, fetchPromoCameraAction } from '../api-actions/catalog-api/catalog-api';
import { catalogData } from './catalog-data';

const fakeCameras = getUidCamerasList(3);

const fakePromoCamera = getFakePromoCamera();

describe('Reducer test: catalogData', () => {
  let mockState: CatalogDataType;


  beforeEach(() => {
    mockState = {
      cameras: [],
      isCamerasListLoading: LoadingStatus.Initial,
      promoCamera: {} as PromoCameraType,
      isPromoCameraLoading: LoadingStatus.Initial
    };
  });

  it('return initial state', () => {
    expect(catalogData.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras with given mock data, update isCamerasListLoading to fulfilled if fetchCamerasAction is fulfilled',
      () => {
        expect(catalogData.reducer(mockState, {
          payload: fakeCameras,
          type: fetchCamerasAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            cameras: fakeCameras,
            isCamerasListLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isCamerasListLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(catalogData.reducer(mockState, {
          type: fetchCamerasAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isCamerasListLoading: LoadingStatus.Pending
          });
      });

    it('Update isCamerasListLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(catalogData.reducer(mockState, {
          type: fetchCamerasAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isCamerasListLoading: LoadingStatus.Rejected
          });
      });

  });

  describe('fetchPromoCameraAction test', () => {
    it('should update cameras with given mock data, update isPromoCameraLoading to fulfilled if fetchPromoCameraAction is fulfilled',
      () => {
        expect(catalogData.reducer(mockState, {
          payload: fakePromoCamera,
          type: fetchPromoCameraAction.fulfilled.type
        }))
          .toEqual({
            ...mockState,
            promoCamera: fakePromoCamera,
            isPromoCameraLoading: LoadingStatus.Fulfilled,
          });
      });

    it('Update isCamerasListLoading to pending if fetchCamerasAction is pending',
      () => {
        expect(catalogData.reducer(mockState, {
          type: fetchPromoCameraAction.pending.type
        }))
          .toEqual({
            ...mockState,
            isPromoCameraLoading: LoadingStatus.Pending
          });
      });

    it('Update isCamerasListLoading to rejected if fetchCamerasAction is rejected',
      () => {
        expect(catalogData.reducer(mockState, {
          type: fetchPromoCameraAction.rejected.type
        }))
          .toEqual({
            ...mockState,
            isPromoCameraLoading: LoadingStatus.Rejected
          });
      });

  });

});

