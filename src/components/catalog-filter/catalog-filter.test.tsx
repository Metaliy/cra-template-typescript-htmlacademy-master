import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogFilter } from './catalog-filter';

describe('Catalog filter ', () => {
  it('should render "Catalog filter component"', () => {
    renderFakeApp(<CatalogFilter />, {});

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });
});
