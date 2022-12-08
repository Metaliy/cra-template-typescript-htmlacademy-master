import { NameSpace } from '../../../consts/const';
import { State } from '../../../types/state-types';


export const getaddedOnBasketItemsId = (state: State): number[] => {

  const idsList: number[] = [];
  state[NameSpace.Basket].addedItems.forEach((item) => {
    idsList.push(item.camera.id);
  });
  return idsList;
};

