import { useState } from 'react';
import { TabName } from '../../consts/const';
import { CameraType } from '../../types/server-data-types';

type ProductTabsProps = {
  selectedCamera: CameraType
}

function ProductTabs ({selectedCamera}:ProductTabsProps) {

  const {vendorCode, category, type, level, description} = selectedCamera;

  const [activeTab, setActiveTab] = useState<string>(TabName.Description);


  return (
    <div className="tabs product__tabs" data-testid="product-tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={activeTab === TabName.Features ? 'tabs__control is-active' : 'tabs__control '} data-testid={activeTab === TabName.Features ? 'features-tub-button-active' : 'features-tub-button'} onClick={() => setActiveTab(TabName.Features)} type="button">Характеристики</button>
        <button className={activeTab === TabName.Description ? 'tabs__control is-active' : 'tabs__control '} data-testid={activeTab === TabName.Description ? 'description-tub-button-active' : 'description-tub-button'} onClick={() => setActiveTab(TabName.Description)} type="button">Описание</button>
      </div>
      <div className="tabs__content">
        <div className={activeTab === TabName.Features ? 'tabs__element is-active' : 'tabs__element'}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={activeTab === TabName.Description ? 'tabs__element is-active' : 'tabs__element'}>
          <div className="product__tabs-text">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export {ProductTabs};
