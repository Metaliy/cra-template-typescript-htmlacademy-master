import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogFilterComponent } from './catalog-filter';

describe('Catalog filter Component', () => {
  it('should render "Catalog filter component"', () => {
    renderFakeApp(<CatalogFilterComponent />, {});

    expect(screen.getByTestId('catalog-filter')).toBeInTheDocument();
  });
});
