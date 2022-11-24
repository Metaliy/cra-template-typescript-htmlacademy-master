import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { NameSpace } from '../../consts/const';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { createAPI } from '../../services/api';
import { CatalogFilter } from './catalog-filter';

const filters = {
  category: [],
  filterType: [],
  level: []
};

const minCamerasPrice = 1000;
const maxCamerasPrice = 199999;

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Catalog]: {
    filters: {
      priceMin: [],
      priceMax: [],
      category: [],
      filterType: [],
      level: []
    }
  }
});

const storeFull = mockStore({
  [NameSpace.Catalog]: {
    filters: {
      priceMin: '1000',
      priceMax: '10000',
      category: ['test'],
      filterType: ['test'],
      level: ['test']
    }
  }
});

describe('Catalog filter component', () => {
  it('should render "Catalog filter component"', () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {});

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });

  it('should click on catalog-sort-rating-button', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});

    await userEvent.click(screen.getByTestId('catalog-category-filter-photocamera'));

    const [actionOne] = store.getActions();
    expect(actionOne.type).toBe('Catalog/categoryFilter');

  });

  it('should click on catalog-category-filter-videocamera', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});

    await userEvent.click(screen.getByTestId('catalog-category-filter-videocamera'));

    const [actionTwo] = store.getActions();
    expect(actionTwo.type).toBe('Catalog/categoryFilter');

  });

  it('should click on catalog-type-filter-digital', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-type-filter-digital'));

    const [actionThree] = store.getActions();
    expect(actionThree.type).toBe('Catalog/typeFilter');

  });

  it('should click on catalog-type-filter-film', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-type-filter-film'));

    const [actionThree] = store.getActions();
    expect(actionThree.type).toBe('Catalog/typeFilter');

  });

  it('should click on catalog-type-filter-snapshot', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-type-filter-snapshot'));

    const [actionThree] = store.getActions();
    expect(actionThree.type).toBe('Catalog/typeFilter');

  });

  it('should click on catalog-type-filter-collection', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-type-filter-collection'));

    const [actionThree] = store.getActions();
    expect(actionThree.type).toBe('Catalog/typeFilter');

  });

  it('should click on catalog-level-filter-zero', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-level-filter-zero'));

    const [actionThree] = store.getActions();
    expect(actionThree.type).toBe('Catalog/levelFilter');

  });

  it('catalog-level-filter-non-professional', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-level-filter-non-professional'));

    const [actionThree] = store.getActions();
    expect(actionThree.type).toBe('Catalog/levelFilter');

  });

  it('should click on catalog-level-filter-professional', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: store});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-level-filter-professional'));

    const [actionThree] = store.getActions();
    expect(actionThree.type).toBe('Catalog/levelFilter');

  });

  it('should input min price in catalog-price-filter-min', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={0} maxCamerasPrice={0} />, {});

    await userEvent.type(screen.getByTestId('catalog-price-filter-min'), '10000');

    await userEvent.click(screen.getByTestId('catalog-filter'));
  });

  it('should input min price in catalog-price-filter-min and input max price in catalog-price-filter-max', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={0} maxCamerasPrice={0} />, {});

    await userEvent.type(screen.getByTestId('catalog-price-filter-min'), '10000');

    await userEvent.type(screen.getByTestId('catalog-price-filter-max'), '10000');

    await userEvent.click(screen.getByTestId('catalog-filter'));
  });

  it('should input min price in catalog-price-filter-min more then input max price in catalog-price-filter-max', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={0} maxCamerasPrice={0} />, {});

    await userEvent.type(screen.getByTestId('catalog-price-filter-min'), '100000');

    await userEvent.type(screen.getByTestId('catalog-price-filter-max'), '100');

    await userEvent.click(screen.getByTestId('catalog-filter'));
  });

  it('should input negative min price in catalog-price-filter-min', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {});

    await userEvent.type(screen.getByTestId('catalog-price-filter-min'), '-1000');

    await userEvent.keyboard('enter');
  });

  it('should input zero min price in catalog-price-filter-min', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {});

    await userEvent.type(screen.getByTestId('catalog-price-filter-min'), '20');

    await userEvent.click(screen.getByTestId('catalog-filter'));
  });

  it('should input min price if max price more in catalog-price-filter-min', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {});

    await userEvent.type(screen.getByTestId('catalog-price-filter-max'), '100000');

    await userEvent.type(screen.getByTestId('catalog-price-filter-min'), '10000000');

    await userEvent.click(screen.getByTestId('catalog-filter'));
  });

  it('should input max price in if max price more', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {});

    await userEvent.type(screen.getByTestId('catalog-price-filter-min'), '1000');

    await userEvent.type(screen.getByTestId('catalog-price-filter-max'), '10');

    await userEvent.click(screen.getByTestId('catalog-filter'));

  });

  it('should input SSS min price in catalog-price-filter-min', async () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {mockStore: storeFull});
    store.clearActions();

    await userEvent.click(screen.getByTestId('catalog-filter-reset-button'));

  });


});

