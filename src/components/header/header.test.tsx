import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { Header } from './header';


describe('Header ', () => {
  it('should render "Header component"', () => {
    renderFakeApp(<Header />, {});

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
