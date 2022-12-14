import { AddItemModalSliceType } from '../../../types/state-types';
import { addedItem, addItemModalOpenedStatus, addItemModalSlice } from './add-item-modal-slice';
import { getFakeCamera } from '../../../mock/mock';

const fakeCamera = getFakeCamera();


describe('Reducer test: addItemModalSlice', () => {
  let mockState: AddItemModalSliceType;


  beforeEach(() => {
    mockState = {
      addItemModalOpenedStatus: false,
      addedCamera: null
    };
  });


  it('return initial state', () => {
    expect(addItemModalSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });

  it('Update addItemModalOpenedStatus if dispatched addItemModalOpenedStatus',
    () => {
      expect(addItemModalSlice.reducer(mockState, addItemModalOpenedStatus(true)))
        .toEqual({
          ...mockState,
          addItemModalOpenedStatus: true
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

