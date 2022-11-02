import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { CatalogSortComponent } from './catalog-sort';

describe('Catalog sort Component', () => {
  it('should render "Catalog sort component"', () => {
    renderFakeApp(<CatalogSortComponent />, {});

    expect(screen.getByTestId('catalog-sort')).toBeInTheDocument();
  });
});
