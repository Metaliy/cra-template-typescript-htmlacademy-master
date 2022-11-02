import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../../mock/fake-app/fake-app';
import { ReviewModalSuccessComponent } from './review-modal-success';
import userEvent from '@testing-library/user-event';


const CloseAfterSuccessfulRevievSend = jest.fn();


describe('Review card component', () => {
  it('should render "Review card component"', () => {
    renderFakeApp(<ReviewModalSuccessComponent onCloseAfterSuccessfulRevievSend={CloseAfterSuccessfulRevievSend}/>, {});

    expect(screen.getByTestId('review-modal-success')).toBeInTheDocument();
  });

  it('should close review modal if user clicks on cross-btn', async () => {
    renderFakeApp(<ReviewModalSuccessComponent onCloseAfterSuccessfulRevievSend={CloseAfterSuccessfulRevievSend}/>, {});

    await userEvent.click(screen.getByTestId('cross-btn'));
    expect(CloseAfterSuccessfulRevievSend).toBeCalledTimes(1);
  });

  it('should close review modal if user clicks on back-to-button', async () => {
    renderFakeApp(<ReviewModalSuccessComponent onCloseAfterSuccessfulRevievSend={CloseAfterSuccessfulRevievSend}/>, {});

    await userEvent.click(screen.getByTestId('back-to-button'));
    expect(CloseAfterSuccessfulRevievSend).toBeCalledTimes(1);
  });
});
