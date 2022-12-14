import { useAppDispatch } from '../../../hooks/hooks';
import { addItemModalOpenedStatus } from '../../../store/slices/add-item-modal-slice/add-item-modal-slice';
import { addedOnBasketItems } from '../../../store/slices/basket-slice/basket-slice';
import { CameraType } from '../../../types/server-data-types';

type AddItemConfirmModalProps = {
  camera: CameraType,
  onSetIsCameraAddedHanlder: CallableFunction
}

export function AddItemConfirmModal({camera, onSetIsCameraAddedHanlder}: AddItemConfirmModalProps):JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid={'overaly'} onClick={() => dispatch(addItemModalOpenedStatus(false))}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`../${camera.previewImgWebp}, ../${camera.previewImgWebp2x} 2x`}></source>
                <img src={`../${camera.previewImg}`} srcSet={`../${camera.previewImg2x}`} width="140" height="120" alt={camera.name}></img>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{camera.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">Плёночная фотокамера</li>
                <li className="basket-item__list-item">Любительский уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera.price}</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" data-testid={'add-on-basket-button'} onClick={() => {
              dispatch(addedOnBasketItems({camera, camerasCount: 1}));
              onSetIsCameraAddedHanlder(true);
            }}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" data-testid={'cross-button'} onClick={() => dispatch(addItemModalOpenedStatus(false))}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
