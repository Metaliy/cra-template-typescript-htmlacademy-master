import { getFakeCamera } from '../../../mock/mock';
import { BasketSliceType } from '../../../types/state-types';
import { addedItemsCounters, addedOnBasketItems, basketInitialState, basketSlice, removedCamera, removedItemConfirm } from './basket-slice';


const fakeCamera = getFakeCamera();
const anotherFakeCamera = getFakeCamera();

describe('Reducer test: basket-slice', () => {
  let mockState: BasketSliceType;
  let mockStateWitchCameras: BasketSliceType;


  beforeEach(() => {
    mockState = {
      addedItems: [],
      numberOfItemsAdded: 0,
      removedCamera: null
    };
  });

  beforeEach(() => {
    mockStateWitchCameras = {
      addedItems: [{camera: fakeCamera, camerasCount: 2}],
      numberOfItemsAdded: 0,
      removedCamera: null
    };
  });

  it('return initial state', () => {
    expect(basketSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  it('Update addedItems if dispatched addedOnBasketItems',
    () => {
      expect(basketSlice.reducer(mockState, addedOnBasketItems({camera: fakeCamera, camerasCount: 1})))
        .toEqual({
          ...mockState,
          addedItems: [{camera: fakeCamera, camerasCount: 1}]
        });
    });

  it('Update addedItems if dispatched addedOnBasketItems with same camera',
    () => {
      expect(basketSlice.reducer(mockStateWitchCameras, addedOnBasketItems({camera: fakeCamera, camerasCount: 1})))
        .toEqual({
          ...mockStateWitchCameras,
          addedItems: [{camera: fakeCamera, camerasCount: 3}]
        });
    });

  it('Update addedItems if dispatched addedOnBasketItems with another camera',
    () => {
      expect(basketSlice.reducer(mockStateWitchCameras, addedOnBasketItems({camera: anotherFakeCamera, camerasCount: 1})))
        .toEqual({
          ...mockStateWitchCameras,
          addedItems: [{camera: fakeCamera, camerasCount: 2}, {camera: anotherFakeCamera, camerasCount: 1}]
        });
    });

  it('Update addedItemsCounters if dispatched addedItemsCounters witch camera plus',
    () => {
      expect(basketSlice.reducer(mockStateWitchCameras, addedItemsCounters({id: fakeCamera.id, isPlus: true})))
        .toEqual({
          ...mockStateWitchCameras,
          addedItems: [{camera: fakeCamera, camerasCount: 3}]
        });
    });

  it('Update addedItemsCounters if dispatched addedItemsCounters witch camera minus',
    () => {
      expect(basketSlice.reducer(mockStateWitchCameras, addedItemsCounters({id: fakeCamera.id, isMinus: true})))
        .toEqual({
          ...mockStateWitchCameras,
          addedItems: [{camera: fakeCamera, camerasCount: 1}]
        });
    });

  it('Update removedCamera if dispatched removedCamera',
    () => {
      expect(basketSlice.reducer(mockStateWitchCameras, removedCamera(fakeCamera)))
        .toEqual({
          ...mockStateWitchCameras,
          removedCamera: fakeCamera
        });
    });

  it('Update addedItems if dispatched removedItemConfirm',
    () => {
      expect(basketSlice.reducer(mockStateWitchCameras, removedItemConfirm(fakeCamera.id)))
        .toEqual({
          ...mockStateWitchCameras,
          addedItems: []
        });
    });

  it('Update state if dispatched basketInitialState',
    () => {
      expect(basketSlice.reducer(mockStateWitchCameras, basketInitialState()))
        .toEqual({
          ...mockState,
        });
    });
});


