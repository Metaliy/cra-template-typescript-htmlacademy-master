import { useEffect, useState } from 'react';
import { FilterCategoryParameter, FilterLevelParameter, FilterTypeParameter } from '../../consts/const';
import { useAppDispatch } from '../../hooks/hooks';
import { priceMinFilter, priceMaxFilter, categoryFilter, typeFilter, levelFilter, filtersInitialState } from '../../store/slices/catalog-slice/catalog-slice';


type CatalogFilterProps = {
  filters: {
    category: string[],
    filterType: string[],
    level: string | string[]
  },
  minCamerasPrice: number,
  maxCamerasPrice: number
}

function CatalogFilter ({filters, minCamerasPrice, maxCamerasPrice}: CatalogFilterProps) {

  const {category, filterType, level} = filters;

  const [minPriceInputValue, setMinPriceInputValue] = useState('');
  const [maxPriceInputValue, setMaxPriceInputValue] = useState('');


  const dispatch = useAppDispatch();

  const minPriceValidation = () => {
    const minPriceInputNumber = Number(minPriceInputValue);

    if(minPriceInputNumber < 0 || minPriceInputNumber < minCamerasPrice) {
      setMinPriceInputValue(String(minCamerasPrice));
    }

    if((minPriceInputNumber > Number(maxPriceInputValue)) && maxPriceInputValue) {
      setMinPriceInputValue(maxPriceInputValue);
    }

    if(minPriceInputNumber < minCamerasPrice || minPriceInputNumber > minCamerasPrice) {
      setMinPriceInputValue(String(minCamerasPrice));
    }

    dispatch((priceMinFilter(Number(minPriceInputValue) > maxCamerasPrice ? maxCamerasPrice : minPriceInputValue)));
  };
  useEffect(() => {
    if(minPriceInputValue) {
      setMinPriceInputValue(String(minCamerasPrice));
    }
    if(minCamerasPrice === 0) {
      setMinPriceInputValue('');
    }

  }, [dispatch, minCamerasPrice]);


  const maxPriceValidation = () => {
    const maxPriceInputNumber = Number(maxPriceInputValue);

    if((maxPriceInputNumber < Number(minPriceInputValue)) && minPriceInputValue) {
      setMaxPriceInputValue(minPriceInputValue);
    }

    if(maxPriceInputNumber < minCamerasPrice) {
      setMaxPriceInputValue(String(minCamerasPrice));
    }

    if(maxPriceInputNumber > maxCamerasPrice || maxPriceInputNumber < maxCamerasPrice) {
      setMaxPriceInputValue(String(maxCamerasPrice));
    }

    if(Number(maxPriceInputValue) < minCamerasPrice) {
      setMaxPriceInputValue(String(minCamerasPrice));
    }


    dispatch((priceMaxFilter(maxPriceInputValue ? maxPriceInputValue : '')));
  };
  useEffect(() => {
    if(maxPriceInputValue) {
      setMaxPriceInputValue(String(maxCamerasPrice));
    }
    if(maxCamerasPrice === 0) {
      setMaxPriceInputValue('');
    }
  }, [dispatch, maxCamerasPrice]);


  return (
    <div className="catalog__aside" data-testid="catalog-filter">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range" >
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    min={0}
                    placeholder={minCamerasPrice !== 0 ? String(minCamerasPrice) : 'от'}
                    onBlur={() => minPriceValidation()}
                    onKeyDown={(evt) => evt.key === 'Enter' ? minPriceValidation() : ''}
                    data-testid="catalog-price-filter-min"
                    onChange={(evt) => setMinPriceInputValue(evt.target.value)}
                    value={minPriceInputValue}
                  >
                  </input>
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    min={0}
                    placeholder={maxCamerasPrice !== 0 ? String(maxCamerasPrice) : 'до'}
                    onBlur={() => maxPriceValidation()}
                    onKeyDown={(evt) => evt.key === 'Enter' ? maxPriceValidation() : ''}
                    data-testid="catalog-price-filter-max"
                    onChange={(evt) => setMaxPriceInputValue(evt.target.value)}
                    value={maxPriceInputValue}
                  >
                  </input>
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="photocamera" checked={category.includes(FilterCategoryParameter.Photocamera)} onChange={() => dispatch((categoryFilter(FilterCategoryParameter.Photocamera)))} data-testid="catalog-category-filter-photocamera"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera" checked={category.includes(FilterCategoryParameter.Videocamera)} onChange={() => dispatch((categoryFilter(FilterCategoryParameter.Videocamera)))} disabled={filterType.includes(FilterTypeParameter.Film) || filterType.includes(FilterTypeParameter.Snapshot)} data-testid="catalog-category-filter-videocamera"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital" checked={filterType.includes(FilterTypeParameter.Digital)} onChange={() => dispatch((typeFilter(FilterTypeParameter.Digital)))} data-testid="catalog-type-filter-digital"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film" checked={filterType.includes(FilterTypeParameter.Film)} onChange={() => dispatch((typeFilter(FilterTypeParameter.Film)))} disabled={category.includes(FilterCategoryParameter.Videocamera) && !category.includes(FilterCategoryParameter.Photocamera)} data-testid="catalog-type-filter-film"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot" checked={filterType.includes(FilterTypeParameter.Snapshot)} onChange={() => dispatch((typeFilter(FilterTypeParameter.Snapshot)))} disabled={category.includes(FilterCategoryParameter.Videocamera) && !category.includes(FilterCategoryParameter.Photocamera)} data-testid="catalog-type-filter-snapshot"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection" checked={filterType.includes(FilterTypeParameter.Collection)} onChange={() => dispatch((typeFilter(FilterTypeParameter.Collection)))} data-testid="catalog-type-filter-collection"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero" checked={level.includes(FilterLevelParameter.Zero)} onChange={() => dispatch((levelFilter(FilterLevelParameter.Zero)))} data-testid="catalog-level-filter-zero"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional" checked={level.includes(FilterLevelParameter.NonProfessional)} onChange={() => dispatch((levelFilter(FilterLevelParameter.NonProfessional)))} data-testid="catalog-level-filter-non-professional"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional" checked={level.includes(FilterLevelParameter.Professional)} onChange={() => dispatch((levelFilter(FilterLevelParameter.Professional)))} data-testid="catalog-level-filter-professional"></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset" onClick={() => dispatch(filtersInitialState())} data-testid="catalog-filter-reset-button">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export {CatalogFilter};
