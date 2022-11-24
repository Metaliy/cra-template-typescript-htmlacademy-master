import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderFakeApp } from '../../../mock/fake-app/fake-app';
import { getUidCamerasList } from '../../../mock/mock';
import { SearchForm } from './search-form';

const fakeCamerasList = getUidCamerasList(5);

describe('Search form component', () => {
  it('should render "Search form component"', () => {
    renderFakeApp(<SearchForm searchedCamerasList={fakeCamerasList} />, {});

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  it('should input camera name"', async () => {
    renderFakeApp(<SearchForm searchedCamerasList={fakeCamerasList} />, {});

    await userEvent.type(screen.getByTestId('search-form-input'), fakeCamerasList[0].name);

    expect(screen.getByText(fakeCamerasList[0].name)).toBeInTheDocument();
  });

  it('should input and delete camera name', async () => {
    renderFakeApp(<SearchForm searchedCamerasList={fakeCamerasList} />, {});

    await userEvent.type(screen.getByTestId('search-form-input'), 'test');

    await userEvent.clear(screen.getByTestId('search-form-input'));

    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });

  it('should input camera name and push reset button', async () => {
    renderFakeApp(<SearchForm searchedCamerasList={fakeCamerasList} />, {});

    await userEvent.type(screen.getByTestId('search-form-input'), 'test');

    await userEvent.click(screen.getByTestId('search-form-reset-button'));

    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
});
