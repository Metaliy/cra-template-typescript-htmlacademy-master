import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../consts/const';
import { AddItemModalSliceType } from '../../../types/state-types';

const initialState: AddItemModalSliceType = {
  addItemModalOpenedStatus: false,
  addedCamera: null
};

export const addItemModalSlice = createSlice ({
  name: NameSpace.AddItemModal,
  initialState,
  reducers: {
    addItemModalOpenedStatus: (state, action) => {
      state.addItemModalOpenedStatus = action.payload;
    },
    addedItem: (state, action) => {
      state.addedCamera = action.payload;
    }
  }
});

export const {addItemModalOpenedStatus, addedItem} = addItemModalSlice.actions;
