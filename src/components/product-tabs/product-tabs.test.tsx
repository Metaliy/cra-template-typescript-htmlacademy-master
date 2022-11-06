import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderFakeApp } from '../../mock/fake-app/fake-app';
import { getFakeCamera } from '../../mock/mock';
import { ProductTabs } from './product-tabs';

const fakeCamera = getFakeCamera();


describe('Product tabs component', () => {
  it('should render "Product tabs component"', () => {
    renderFakeApp(<ProductTabs selectedCamera={fakeCamera} />, {});

    expect(screen.getByTestId('product-tabs')).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
  });

  it('should click features-tub-button"', async () => {
    renderFakeApp(<ProductTabs selectedCamera={fakeCamera} />, {});


    expect(screen.getByTestId('features-tub-button')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('features-tub-button'));
    expect(screen.queryByTestId('features-tub-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('features-tub-button-active')).toBeInTheDocument();
  });

  it('should click description-tub-button after click features-tub-button"', async () => {
    renderFakeApp(<ProductTabs selectedCamera={fakeCamera} />, {});

    expect(screen.getByTestId('description-tub-button-active')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('features-tub-button'));
    expect(screen.queryByTestId('description-tub-button-active')).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('description-tub-button'));
    expect(screen.getByTestId('description-tub-button-active')).toBeInTheDocument();
  });
});
