import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { SearchForm } from './search-form';

describe('Search form component', () => {
  it('should render "Search form component"', () => {
    renderFakeApp(<SearchForm />, {});

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
