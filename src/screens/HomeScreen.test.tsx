import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../hooks/useFetchAllCards', () => ({
  useFetchAllCards: () => ({
    data: [
      {cardId: 1, name: 'Card 1'},
      {cardId: 2, name: 'Card 2'},
    ],
  }),
}));

describe('HomeScreen', () => {
  it('renders list of cards', () => {
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Card 1')).toBeTruthy();
    expect(getByText('Card 2')).toBeTruthy();
  });

  it('navigates to detail screen on card press', () => {
    const {getByText} = render(<HomeScreen />);
    const card = getByText('Card 1');
    fireEvent.press(card);
    expect(mockNavigate).toHaveBeenCalledWith('Detail', {
      item: {cardId: 1, name: 'Card 1'},
    });
  });
});
