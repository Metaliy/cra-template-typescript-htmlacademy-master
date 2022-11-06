import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { Loader } from './loading-screen';

describe('Loader component', () => {
  it('should render "Icon container component component"', () => {
    renderFakeApp(<Loader />, {});

    expect(screen.getByTestId('loader-component')).toBeInTheDocument();
  });
});
