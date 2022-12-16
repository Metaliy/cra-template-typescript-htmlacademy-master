import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../consts/const';
import { AddItemModalSliceType } from '../../../types/state-types';

const initialState: AddItemModalSliceType = {
  isAddItemModal: false,
  addedCamera: null
};

export const addItemModalSlice = createSlice ({
  name: NameSpace.AddItemModal,
  initialState,
  reducers: {
    addItemPopup: (state, action) => {
      state.isAddItemModal = action.payload;
    },
    addedItem: (state, action) => {
      state.addedCamera = action.payload;
    }
  }
});

export const {addItemPopup, addedItem} = addItemModalSlice.actions;
