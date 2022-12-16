import { Link } from 'react-router-dom';
import browserHistory from '../../../browser-history';
import { AppRoute } from '../../../consts/const';

type AddItemSuccessModalProps = {
  onCloseClick: CallableFunction,
  redirectPath?: string
}

export function AddItemSuccessModal({onCloseClick, redirectPath}: AddItemSuccessModalProps):JSX.Element {

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-testid={'overaly'} onClick={() => onCloseClick()}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" data-testid={'back-to-catalog-button'} to={redirectPath ? redirectPath : '' } onClick={() => onCloseClick()}>Продолжить покупки</Link>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" data-testid={'go-to-basket-button'} onClick={() => browserHistory.push(AppRoute.Basket)}>Перейти в корзину</button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" data-testid={'cross-button'} onClick={() => onCloseClick()}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
