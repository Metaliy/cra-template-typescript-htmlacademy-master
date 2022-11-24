import { screen } from '@testing-library/react';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { ReviewModal } from './review-modal';
import userEvent from '@testing-library/user-event';
import { LoadingStatus, NameSpace } from '../../../consts/const';
import { getFakeCamera } from '../../../mock/mock';

const reviewSentStatus = LoadingStatus.Initial;
const reviewModalOpenedStatus = true;
const cameraId = getFakeCamera().id;

const mockState = {
  [NameSpace.Product]: {
    reviewModalOpenedStatus: true,
  },
  [NameSpace.Reviews]: {
    reviewSentStatus: LoadingStatus.Initial,
  },

};


describe('Review modal component', () => {
  it('should render "Review modal component"', () => {
    renderFakeApp(<ReviewModal reviewModalOpenedStatus={reviewModalOpenedStatus} reviewSentStatus={reviewSentStatus} cameraId={cameraId}/>, {
      initialState: mockState
    });

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });

  it('should close review modal if user clicks on cross-btn', async () => {
    renderFakeApp(<ReviewModal reviewModalOpenedStatus={reviewModalOpenedStatus} reviewSentStatus={reviewSentStatus} cameraId={cameraId}/>, {
      initialState: mockState
    });

    await userEvent.click(screen.getByTestId('cross-btn'));

  });

  it('should close review modal if user clicks on modal-overlay not sended', async () => {
    renderFakeApp(<ReviewModal reviewModalOpenedStatus={reviewModalOpenedStatus} reviewSentStatus={reviewSentStatus} cameraId={cameraId}/>, {
      initialState: mockState
    });
    await userEvent.click(screen.getByTestId('modal-overlay'));
  });

  it('should render "Review modal success component"', () => {
    renderFakeApp(<ReviewModal reviewModalOpenedStatus={reviewModalOpenedStatus} reviewSentStatus={LoadingStatus.Fulfilled} cameraId={cameraId}/>, {
      initialState: mockState
    });

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });

});
