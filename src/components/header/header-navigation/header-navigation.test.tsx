import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { HeaderNavigationComponent } from './header-navigation';

describe('Header navigation Component', () => {
  it('should render "Header navigation component"', () => {
    renderFakeApp(<HeaderNavigationComponent />, {});

    expect(screen.getByTestId('main-nav')).toBeInTheDocument();
  });
});
