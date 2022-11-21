import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogFilter } from './catalog-filter';

const filters = {
  priceMin: [],
  priceMax: [],
  category: [],
  filterType: [],
  level: []
};

const minCamerasPrice = 1000;
const maxCamerasPrice = 199999;

describe('Catalog filter component', () => {
  it('should render "Catalog filter component"', () => {
    renderFakeApp(<CatalogFilter filters={filters} minCamerasPrice={minCamerasPrice} maxCamerasPrice={maxCamerasPrice} />, {});

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });
});
