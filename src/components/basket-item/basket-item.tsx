import { useAppDispatch } from '../../hooks/hooks';
import { addedItemsCounters, removedCamera } from '../../store/slices/basket-slice/basket-slice';
import { CameraType } from '../../types/server-data-types';
import { getPriceWitchSpaces } from '../../utils/utils';

type BasketItemProps = {
  camera: CameraType,
  camerasCount: number,
  setRemoveCameraModalOpenStatusHandler: CallableFunction
}


function BasketItem({camera, camerasCount, setRemoveCameraModalOpenStatusHandler}: BasketItemProps):JSX.Element {
  const {name, price, id, previewImg, previewImgWebp, previewImgWebp2x, previewImg2x, level, category, vendorCode} = camera;

  const dispatch = useAppDispatch();

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}></source>
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x}`} width="140" height="120" alt={name}></img>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{getPriceWitchSpaces(price)} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" data-testid={'plus-item-button'} onClick={() => dispatch(addedItemsCounters({id: id, isMinus: true}))} disabled={camerasCount <= 1}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={camerasCount} min="1" max="99" aria-label="количество товара" readOnly></input>
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" data-testid={'minus-item-button'} onClick={() => dispatch(addedItemsCounters({id: id, isPlus: true}))} disabled={camerasCount >= 99}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getPriceWitchSpaces(price * camerasCount)}</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" data-testid={'open-confirm-delete-item-modal-button'} onClick={() => {
        setRemoveCameraModalOpenStatusHandler(true);
        dispatch(removedCamera(camera));
      }}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export {BasketItem};
