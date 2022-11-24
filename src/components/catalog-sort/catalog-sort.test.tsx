import { screen } from '@testing-library/react';
import { NameSpace, SortOrderParameter, SortTypeParameter } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogSort } from './catalog-sort';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Catalog]: {
    sort: {
      sortType: SortTypeParameter.Price,
      order:  SortOrderParameter.LowToHigh
    }
  }
});

const storeWithRatingSortType = mockStore({
  [NameSpace.Catalog]: {
    sort: {
      sortType: SortTypeParameter.Rating,
      order:  SortOrderParameter.HighToLow
    }
  }
});

describe('Catalog sort component', () => {
  it('should render "Catalog sort component"', () => {
    renderFakeApp(<CatalogSort type={SortTypeParameter.Price} order={SortOrderParameter.LowToHigh} />, {});

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });

  it('should click on catalog-sort-rating-button', async () => {
    renderFakeApp(<CatalogSort type={SortTypeParameter.Price} order={SortOrderParameter.LowToHigh} />, {mockStore: store});

    await userEvent.click(screen.getByTestId('catalog-sort-rating-button'));

    const [action] = store.getActions();
    expect(action.type).toBe('Catalog/sortType');
  });

  it('should click on catalog-sort-price-button', async () => {
    renderFakeApp(<CatalogSort type={SortTypeParameter.Rating} order={SortOrderParameter.HighToLow} />, {mockStore: storeWithRatingSortType});

    await userEvent.click(screen.getByTestId('catalog-sort-price-button'));

    const [action] = store.getActions();
    expect(action.type).toBe('Catalog/sortType');

  });

  it('should click on catalog-sort-hight-to-low-button', async () => {
    renderFakeApp(<CatalogSort type={SortTypeParameter.Price} order={SortOrderParameter.LowToHigh} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-sort-hight-to-low-button'));

    const [action] = store.getActions();
    expect(action.type).toBe('Catalog/sortOrder');
  });

  it('should click on catalog-sort-low-to-hight-button', async () => {
    renderFakeApp(<CatalogSort type={SortTypeParameter.Rating} order={SortOrderParameter.HighToLow} />, {mockStore: storeWithRatingSortType});

    await userEvent.click(screen.getByTestId('catalog-sort-low-to-hight-button'));

    const [action] = store.getActions();
    expect(action.type).toBe('Catalog/sortOrder');

  });

});
