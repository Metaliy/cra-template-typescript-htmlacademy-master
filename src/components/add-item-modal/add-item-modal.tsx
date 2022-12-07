import { useState } from 'react';
import { CameraType } from '../../types/server-data-types';
import { AddItemConfirmModal } from './add-item-confirm-modal/add-item-confirm-modal';
import { AddItemSuccessModal } from './add-item-success-modal/add-item-success-popup';

type AddItemModalProps = {
  addedCamera: CameraType
}

export function AddItemModal({addedCamera}: AddItemModalProps):JSX.Element {

  const [isCameraAdded, onSetIsCameraAdded] = useState(false);

  return (
    isCameraAdded ? <AddItemSuccessModal /> :
      <AddItemConfirmModal camera={addedCamera} onSetIsCameraAddedHanlder={onSetIsCameraAdded}/>
  );
}
