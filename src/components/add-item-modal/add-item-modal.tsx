import { useState } from 'react';
import { CameraType } from '../../types/server-data-types';
import { AddItemConfirmModal } from './add-item-confirm-modal/add-item-confirm-modal';
import { AddItemSuccessModal } from './add-item-success-modal/add-item-success-popup';

type AddItemModalProps = {
  addedCamera: CameraType,
  isCatalog?: boolean
}

export function AddItemModal({addedCamera, isCatalog}: AddItemModalProps):JSX.Element {

  const [isCameraAdded, onSetIsCameraAdded] = useState(false);

  return (
    isCameraAdded ? <AddItemSuccessModal isCatalog={isCatalog} /> :
      <AddItemConfirmModal camera={addedCamera} onSetIsCameraAddedHanlder={onSetIsCameraAdded}/>
  );
}
