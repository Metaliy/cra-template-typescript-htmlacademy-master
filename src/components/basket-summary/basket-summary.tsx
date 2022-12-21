import { useState } from 'react';
import { LoadingStatus } from '../../consts/const';
import { useAppDispatch } from '../../hooks/hooks';
import { postCouponAction } from '../../store/api-actions/coupon-api/coupon-api';
import { postCameraOrderAction } from '../../store/api-actions/order-api/order-api';
import { CameraType, PostOrderType } from '../../types/server-data-types';
import { getPriceWitchSpaces } from '../../utils/utils';

type BasketSummaryProps = {
  addedCameras: {
  camera: CameraType,
  camerasCount: number,
  }[],
  discountPercentage: number,
  couponStatus: LoadingStatus,
  couponName: string | null,
  onOrderSent: CallableFunction
}

export function BasketSummary({addedCameras, discountPercentage, couponStatus, couponName, onOrderSent}: BasketSummaryProps):JSX.Element {

  const initialSummaryPrice = 0;
  const summaryPrice = addedCameras.reduce((accumulator, currentValue) => accumulator + (currentValue.camera.price * currentValue.camerasCount), initialSummaryPrice);


  const orderDiscount = Math.round(summaryPrice * discountPercentage / 100);

  const [inputTextValue, setInputTextValue] = useState('');

  const dispatch = useAppDispatch();


  const getCamerasIdListForOrder = () => {
    const orderedCameras: PostOrderType = {
      camerasIds: [],
      coupon: couponName
    };
    addedCameras.forEach((item) => {
      for (let i = 0; i < item.camerasCount; i++) {
        orderedCameras.camerasIds.push(item.camera.id);
      }
    });
    return orderedCameras;
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form onSubmit={(evt) => {
            evt.preventDefault();
            dispatch(postCouponAction({coupon: inputTextValue}));
          }}
          >
            <div className={`custom-input ${couponStatus === LoadingStatus.Fulfilled ? 'is-valid' : ''}${couponStatus === LoadingStatus.Rejected || /[/\s]/.test(inputTextValue) ? 'is-invalid' : ''}`}>
              <label><span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" placeholder="Введите промокод" onChange={(evt) => setInputTextValue(evt.target.value)}></input>
              </label>
              <p className="custom-input__error">{/[/\s]/.test(inputTextValue) ? 'Пробел не допустим' : 'Промокод неверный'}</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit" disabled={/[/\s]/.test(inputTextValue)}>Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{getPriceWitchSpaces(summaryPrice)} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={`basket__summary-value ${orderDiscount > 0 ? 'basket__summary-value--bonus' : ''}`}>{getPriceWitchSpaces(orderDiscount)} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{getPriceWitchSpaces(summaryPrice - orderDiscount)} ₽</span></p>
        <button className="btn btn--purple" type="submit" onClick={() => {
          onOrderSent(true);
          dispatch(postCameraOrderAction(getCamerasIdListForOrder()));
        }} disabled={addedCameras.length === 0}
        >Оформить заказ
        </button>
      </div>
    </div>

  );
}
