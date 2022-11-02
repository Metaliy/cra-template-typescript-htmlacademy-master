import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { SearchFormComponent } from './search-form';

describe('Search form component', () => {
  it('should render "Search form component"', () => {
    renderFakeApp(<SearchFormComponent />, {});

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
