import { AddItemModalSliceType } from '../../../types/state-types';
import { addedItem, addItemPopup, addItemModalSlice } from './add-item-modal-slice';
import { getFakeCamera } from '../../../mock/mock';

const fakeCamera = getFakeCamera();


describe('Reducer test: addItemModalSlice', () => {
  let mockState: AddItemModalSliceType;


  beforeEach(() => {
    mockState = {
      isAddItemModal: false,
      addedCamera: null
    };
  });


  it('return initial state', () => {
    expect(addItemModalSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  it('Update isAddItemModalOpened if dispatched isAddItemModalOpened',
    () => {
      expect(addItemModalSlice.reducer(mockState, addItemPopup(true)))
        .toEqual({
          ...mockState,
          isAddItemModal: true
        });
    });

  it('Update addedCamera if dispatched addedCamera',
    () => {
      expect(addItemModalSlice.reducer(mockState, addedItem(fakeCamera)))
        .toEqual({
          ...mockState,
          addedCamera: fakeCamera
        });
    });

});

