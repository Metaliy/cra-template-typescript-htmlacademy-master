import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { addItemPopup } from '../../store/slices/add-item-modal-slice/add-item-modal-slice';
import { addedOnBasketItems } from '../../store/slices/basket-slice/basket-slice';
import { CameraType } from '../../types/server-data-types';
import { AddItemConfirmModal } from './add-item-confirm-modal/add-item-confirm-modal';
import { AddItemSuccessModal } from './add-item-success-modal/add-item-success-popup';

type AddItemModalProps = {
  addedCamera: CameraType,
  redirectPath?: string | ''
}

export function AddItemModal({addedCamera, redirectPath}: AddItemModalProps):JSX.Element {

  const dispatch = useAppDispatch();

  const [addedItem, setAddedItem] = useState();

  const handleCloseModalClick = () => dispatch(addItemPopup(false));

  useEffect(() => {
    if(addedItem){
      dispatch(addedOnBasketItems(addedItem));
    }
  }, [dispatch, addedItem]);

  return (
    addedItem ? <AddItemSuccessModal onCloseClick={handleCloseModalClick} redirectPath={redirectPath} /> :
      <AddItemConfirmModal camera={addedCamera} onSubmitButtonClick={setAddedItem} onCloseClick={handleCloseModalClick}/>
  );
}
