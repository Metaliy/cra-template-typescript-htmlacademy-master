import { useEffect, useRef } from 'react';
import { FilterCategoryParameter, FilterLevelParameter, FilterTypeParameter } from '../../consts/const';
import { useAppDispatch } from '../../hooks/hooks';
import { categoryFilter, filterTypeFilter, levelFilter, priceMinFilter, priceMaxFilter } from '../../store/catalog-slice/catalog-slice';

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
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const maxPriceInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const minPriceValidation = () => {
    if (!minPriceInputRef.current ) {
      return;
    }
    const minPriceInputRefInput = Number(minPriceInputRef.current?.value);

    if(minPriceInputRefInput < 0 || minPriceInputRefInput < minCamerasPrice) {
      minPriceInputRef.current.value = String(minCamerasPrice);
    }

    if((minPriceInputRefInput > Number(maxPriceInputRef.current?.value)) && maxPriceInputRef.current?.value) {
      minPriceInputRef.current.value = maxPriceInputRef.current.value;
    }

    if(minPriceInputRefInput > maxCamerasPrice) {
      minPriceInputRef.current.value = String(maxCamerasPrice);
    }

    dispatch((priceMinFilter(Number(minPriceInputRef.current.value) < minPriceInputRefInput ? minPriceInputRef.current.value : minPriceInputRefInput)));
  };
  useEffect(() => {
    if(minPriceInputRef.current?.value) {
      minPriceInputRef.current.value = String(minCamerasPrice);
    }
  }, [minCamerasPrice]);


  const maxPriceValidation = () => {
    if (!maxPriceInputRef.current) {
      return;
    }
    const maxPriceInputRefInput = Number(maxPriceInputRef.current?.value);

    if((maxPriceInputRefInput < Number(minPriceInputRef.current?.value)) && minPriceInputRef.current?.value) {
      maxPriceInputRef.current.value = minPriceInputRef.current.value;
      // eslint-disable-next-line no-console
      console.log(maxPriceInputRefInput);
    }

    if(maxPriceInputRefInput < minCamerasPrice) {
      maxPriceInputRef.current.value = String(minCamerasPrice);
    }

    if(maxPriceInputRefInput > maxCamerasPrice) {
      maxPriceInputRef.current.value = String(maxCamerasPrice);
    }

    dispatch((priceMaxFilter(Number(maxPriceInputRef.current.value) > maxPriceInputRefInput ? maxPriceInputRef.current.value : maxPriceInputRefInput)));
  };
  useEffect(() => {
    if(maxPriceInputRef.current?.value) {
      maxPriceInputRef.current.value = String(maxCamerasPrice);
    }
  }, [maxCamerasPrice]);

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
                    ref={minPriceInputRef}
                    placeholder={minCamerasPrice !== 0 ? String(minCamerasPrice) : 'от'}
                    onBlur={() => minPriceValidation()}
                    onKeyDown={(evt) => evt.key === 'Enter' ? minPriceValidation() : ''}
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
                    ref={maxPriceInputRef}
                    placeholder={maxCamerasPrice !== 0 ? String(maxCamerasPrice) : 'до'}
                    onBlur={() => maxPriceValidation()}
                    onKeyDown={(evt) => evt.key === 'Enter' ? maxPriceValidation() : ''}
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
                <input type="checkbox" name="photocamera" checked={category.includes(FilterCategoryParameter.Photocamera)} onChange={() => dispatch((categoryFilter(FilterCategoryParameter.Photocamera)))}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera" checked={category.includes(FilterCategoryParameter.Videocamera)} onChange={() => dispatch((categoryFilter(FilterCategoryParameter.Videocamera)))}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital" checked={filterType.includes(FilterTypeParameter.Digital)} onChange={() => dispatch((filterTypeFilter(FilterTypeParameter.Digital)))}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film" checked={filterType.includes(FilterTypeParameter.Film)} onChange={() => dispatch((filterTypeFilter(FilterTypeParameter.Film)))} disabled={category.includes(FilterCategoryParameter.Videocamera) && !category.includes(FilterCategoryParameter.Photocamera)}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot" checked={filterType.includes(FilterTypeParameter.Snapshot)} onChange={() => dispatch((filterTypeFilter(FilterTypeParameter.Snapshot)))} disabled={category.includes(FilterCategoryParameter.Videocamera) && !category.includes(FilterCategoryParameter.Photocamera)}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection" checked={filterType.includes(FilterTypeParameter.Collection)} onChange={() => dispatch((filterTypeFilter(FilterTypeParameter.Collection)))}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero" checked={level.includes(FilterLevelParameter.Zero)} onChange={() => dispatch((levelFilter(FilterLevelParameter.Zero)))}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional" checked={level.includes(FilterLevelParameter.NonProfessional)} onChange={() => dispatch((levelFilter(FilterLevelParameter.NonProfessional)))}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional" checked={level.includes(FilterLevelParameter.Professional)} onChange={() => dispatch((levelFilter(FilterLevelParameter.Professional)))}></input>
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export {CatalogFilter};
