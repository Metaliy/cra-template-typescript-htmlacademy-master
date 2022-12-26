import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../consts/const';
import { BasketSliceType } from '../../../types/state-types';

const initialState: BasketSliceType = {
  addedItems: [],
  numberOfItemsAdded: 0,
  removedCamera: null
};

export const basketSlice = createSlice ({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addedOnBasketItems: (state, action) => {
      const addedCamera = state.addedItems.find((item) => item.camera.id === action.payload.camera.id);
      if(addedCamera) {
        addedCamera.camerasCount = addedCamera.camerasCount + action.payload.camerasCount;
        return;
      }
      if(!addedCamera) {
        state.addedItems.push(action.payload);
      }
    },
    addedItemsCountSum: (state) => {
      const initialValue = 0;
      state.numberOfItemsAdded = state.addedItems.reduce((accumulator, currentValue) => accumulator + currentValue.camerasCount, initialValue);
    },
    addedItemsCounters: (state, action) => {
      const changedItem = state.addedItems.find((item) => item.camera.id === action.payload.id);
      if(action.payload.isPlus && changedItem && changedItem.camerasCount <= 99) {
        changedItem.camerasCount = changedItem.camerasCount + 1;
      }
      if(action.payload.isMinus && changedItem && changedItem.camerasCount >= 1) {
        changedItem.camerasCount = changedItem.camerasCount - 1;
      }
    },
    removedCamera: (state, action) => {
      state.removedCamera = action.payload;
    },
    removedItemConfirm: (state, action) => {
      const removedItemIndex = state.addedItems.findIndex((item) => item.camera.id === action.payload);
      state.addedItems.splice(removedItemIndex, 1);
    },
    basketInitialState: (state) => {
      state.addedItems = [];
      state.numberOfItemsAdded = 0;
      state.removedCamera = null;
    },
    addedItemsCount: (state, action) => {
      const changedItem = state.addedItems.find((item) => item.camera.id === action.payload.id);
      if(changedItem && changedItem.camerasCount) {
        changedItem.camerasCount = action.payload.count;
      }
    }
  }
});

export const {addedOnBasketItems, addedItemsCountSum, addedItemsCounters, removedCamera, removedItemConfirm, basketInitialState, addedItemsCount} = basketSlice.actions;
