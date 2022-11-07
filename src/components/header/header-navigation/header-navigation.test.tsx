import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { HeaderNavigation } from './header-navigation';

describe('Header navigation component', () => {
  it('should render "Header navigation component"', () => {
    renderFakeApp(<HeaderNavigation />, {});

    expect(screen.getByTestId('main-nav')).toBeInTheDocument();
  });
});
