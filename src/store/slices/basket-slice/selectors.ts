import { NameSpace } from '../../../consts/const';
import { CameraType } from '../../../types/server-data-types';
import { State } from '../../../types/state-types';


export const getaddedOnBasketItemsId = (state: State): number[] => {

  const idsList: number[] = [];
  state[NameSpace.Basket].addedItems.forEach((item) => {
    idsList.push(item.camera.id);
  });
  return idsList;
};

export const getNumberOfItemsAdded = (state: State): number => state[NameSpace.Basket].numberOfItemsAdded;

export const getAddedOnBasketItems = (state: State): { camera: CameraType; camerasCount: number; }[] => state[NameSpace.Basket].addedItems;

export const getRemovedCamera = (state: State): CameraType | undefined => state[NameSpace.Basket].removedCamera;
