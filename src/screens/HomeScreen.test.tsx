// __tests__/HomeScreen.test.tsx
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import {useHomeScreenData} from '../hooks/useHomeScreenData';
import {useNavigation} from '@react-navigation/native';

jest.mock('../hooks/useHomeScreenData');
jest.mock('@react-navigation/native');

describe('HomeScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({navigate: mockNavigate});
    (useHomeScreenData as jest.Mock).mockReturnValue({
      filteredCategories: ['Basic', 'Classic'],
      searchText: '',
      setSearchText: jest.fn(),
    });
  });

  it('renders search input and flatlist correctly', () => {
    const {getByPlaceholderText, getByText} = render(<HomeScreen />);
    expect(getByPlaceholderText('Search categories...')).toBeTruthy();
    expect(getByText('Basic')).toBeTruthy();
    expect(getByText('Classic')).toBeTruthy();
  });

  it('calls setSearchText when input changes', () => {
    const setSearchTextMock = jest.fn();
    (useHomeScreenData as jest.Mock).mockReturnValue({
      filteredCategories: ['Basic'],
      searchText: '',
      setSearchText: setSearchTextMock,
    });

    const {getByPlaceholderText} = render(<HomeScreen />);
    fireEvent.changeText(getByPlaceholderText('Search categories...'), 'ma');
    expect(setSearchTextMock).toHaveBeenCalledWith('ma');
  });

  it('navigates to detail screen on press', () => {
    const {getByText} = render(<HomeScreen />);
    fireEvent.press(getByText('Basic'));
    expect(mockNavigate).toHaveBeenCalledWith('Detail', {category: 'Basic'});
  });
});
