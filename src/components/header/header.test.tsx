import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { HeaderComponent } from './header';


describe('Header Component', () => {
  it('should render "Header component"', () => {
    renderFakeApp(<HeaderComponent />, {});

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
