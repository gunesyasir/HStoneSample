import React from 'react';
import {render} from '@testing-library/react-native';
import DetailScreen from '../screens/DetailScreen';
import {useDetailScreenData} from '../hooks/useDetailScreenData';

jest.mock('../hooks/useDetailScreenData');

describe('DetailScreen', () => {
  it('renders card names from hook', () => {
    (useDetailScreenData as jest.Mock).mockReturnValue({
      cards: [
        {cardId: '1', name: 'Card1'},
        {cardId: '2', name: 'Card2'},
      ],
    });

    const {getByText} = render(<DetailScreen />);

    expect(getByText('Card1')).toBeTruthy();
    expect(getByText('Card2')).toBeTruthy();
  });

  it('renders empty list if no cards', () => {
    (useDetailScreenData as jest.Mock).mockReturnValue({cards: []});

    const {queryByText} = render(<DetailScreen />);

    expect(queryByText('Card1')).toBeNull();
  });
});
