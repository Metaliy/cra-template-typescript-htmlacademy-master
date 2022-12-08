import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../consts/const';
import { BasketSliceType } from '../../../types/state-types';

const initialState: BasketSliceType = {
  addedItems: [],
  numberOfItemsAdded: 0
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
    addedItemsCount: (state) => {
      const initialValue = 0;
      state.numberOfItemsAdded = state.addedItems.reduce((accumulator, currentValue) => accumulator + currentValue.camerasCount, initialValue);
    }
  }
});

export const {addedOnBasketItems, addedItemsCount} = basketSlice.actions;
