import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AppStateComponent from '../components/AppStateComponent';
import {useNetworkStore} from '../state/useNetworkStore';

jest.mock('../state/useNetworkStore');

describe('AppStateComponent', () => {
  afterEach(() => {
    // We need to clear previous mocks to isolate rest tests.
    jest.clearAllMocks();
  });

  it('renders loading indicator when isLoading is true', () => {
    (useNetworkStore as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      hasError: false,
      hasRetry: false,
      errorMessage: '',
      triggerRetry: jest.fn(),
    });

    const {getByTestId} = render(<AppStateComponent />);
    expect(getByTestId('activityIndicator')).toBeTruthy();
  });

  it('renders error message when hasError is true and no retry', () => {
    (useNetworkStore as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      hasError: true,
      hasRetry: false,
      errorMessage: 'Something went wrong',
      triggerRetry: jest.fn(),
    });

    const {getByTestId} = render(<AppStateComponent />);
    expect(getByTestId('errorMessage')).toBeTruthy();
  });

  it('renders retry button when hasError and hasRetry are true', () => {
    const mockRetry = jest.fn();

    (useNetworkStore as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      hasError: true,
      hasRetry: true,
      errorMessage: '',
      triggerRetry: mockRetry,
    });

    const {getByText} = render(<AppStateComponent />);
    const button = getByText('Try Again');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockRetry).toHaveBeenCalled();
  });

  it('renders nothing when not loading and no error', () => {
    (useNetworkStore as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      hasError: false,
      hasRetry: false,
      errorMessage: '',
      triggerRetry: jest.fn(),
    });

    const {toJSON} = render(<AppStateComponent />);
    expect(toJSON()).toBeNull();
  });
});
