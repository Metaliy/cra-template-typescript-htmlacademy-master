import { screen } from '@testing-library/react';
import { getFakeCamera } from '../../../mock/mock';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { ReviewModalComponent } from './review-modal';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { NameSpace } from '../../../consts/const';
import { createAPI } from '../../../services/api';

const fakeCamera = getFakeCamera();

const modalStatusHandler = jest.fn();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.ProductProcess]: {
    reviewSentStatus: false
  }
});

describe('Review card component', () => {
  it('should render "Review card component"', () => {
    renderFakeApp(<ReviewModalComponent cameraId={fakeCamera.id} isOpen modalStatusHandler={modalStatusHandler}/>, {});

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });

  it('should close review modal if user clicks on cross-btn', async () => {
    renderFakeApp(<ReviewModalComponent cameraId={fakeCamera.id} isOpen modalStatusHandler={modalStatusHandler}/>, {});

    await userEvent.click(screen.getByTestId('cross-btn'));
    expect(modalStatusHandler).toBeCalledTimes(1);
  });

  it('should close review modal if user clicks on modal-overlay not sended', async () => {
    renderFakeApp(<ReviewModalComponent cameraId={fakeCamera.id} isOpen modalStatusHandler={modalStatusHandler}/>, {});


    await userEvent.click(screen.getByTestId('modal-overlay'));
    expect(modalStatusHandler).toBeCalledTimes(1);
  });

  it('should send empty review', async () => {
    renderFakeApp(<ReviewModalComponent cameraId={fakeCamera.id} isOpen modalStatusHandler={modalStatusHandler}/>, {});

    expect(screen.getAllByTestId('initial-input')[3]).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.click(screen.getByTestId('submit'));
    expect(screen.getAllByTestId('input-invalid')[3]).toBeInTheDocument();
  });

  it('should close review modal if user clicks on modal-overlay and rerivew sended', async () => {
    renderFakeApp(<ReviewModalComponent cameraId={fakeCamera.id} isOpen modalStatusHandler={modalStatusHandler}/>, {});

    await userEvent.type(screen.getByPlaceholderText(/Введите ваше имя/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Главные недостатки товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Основные преимущества товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i), 'testtesttest');
    await userEvent.click(screen.getByTestId('rate-bar-input-3'));
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.click(screen.getByTestId('modal-overlay'));
    expect(modalStatusHandler).toBeCalledTimes(1);
  });

  it('should close review modal if user press on esc button and rerivew sended', async () => {
    renderFakeApp(<ReviewModalComponent cameraId={fakeCamera.id} isOpen modalStatusHandler={modalStatusHandler}/>, {});

    await userEvent.type(screen.getByPlaceholderText(/Введите ваше имя/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Главные недостатки товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Основные преимущества товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i), 'testtesttest');
    await userEvent.click(screen.getByTestId('rate-bar-input-3'));
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.click(screen.getByTestId('submit'));
    await userEvent.keyboard('{Escape}');
  });

  it('should review correctly sended', async () => {
    renderFakeApp(<ReviewModalComponent cameraId={fakeCamera.id} isOpen modalStatusHandler={modalStatusHandler}/>, {
      mockStore:store
    });

    await userEvent.type(screen.getByPlaceholderText(/Введите ваше имя/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Главные недостатки товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Основные преимущества товара/i), 'testtesttest');
    await userEvent.type(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i), 'testtesttest');
    await userEvent.click(screen.getByTestId('rate-bar-input-3'));
    await userEvent.click(screen.getByTestId('submit'));

    const [action] = store.getActions();
    expect(action.type).toBe('data/postCameraReview/pending');
  });

});
