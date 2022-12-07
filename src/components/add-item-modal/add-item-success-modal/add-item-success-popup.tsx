import { generatePath, Link } from 'react-router-dom';
import browserHistory from '../../../browser-history';
import { AppRoute } from '../../../consts/const';
import { useAppDispatch } from '../../../hooks/hooks';
import { addItemModalOpenedStatus } from '../../../store/slices/add-item-modal-slice/add-item-modal-slice';

export function AddItemSuccessModal():JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(addItemModalOpenedStatus(false))}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to={generatePath(AppRoute.Catalog, {id: '1'})} onClick={() => dispatch(addItemModalOpenedStatus(false))}>Продолжить покупки</Link>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={() => browserHistory.push(AppRoute.Basket)}>Перейти в корзину</button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(addItemModalOpenedStatus(false))}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
