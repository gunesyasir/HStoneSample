import {useRoute} from '@react-navigation/native';
import {useCardStore} from '../state/useCardStore';
import {renderHook} from '@testing-library/react-native';
import {useDetailScreenData} from './useDetailScreenData.ts';

jest.mock('@react-navigation/native');
jest.mock('../state/useCardStore');

describe('useDetailScreenData', () => {
  it('returns correct cards for given category', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {category: 'Basic'},
    });

    (useCardStore as unknown as jest.Mock).mockReturnValue({
      cardsByCategory: {
        Basic: [{cardId: '1', name: 'CardBasic1'}],
        Classic: [{cardId: '2', name: 'CardClassic1'}],
      },
    });

    const {result} = renderHook(() => useDetailScreenData());

    expect(result.current.cards).toEqual([{cardId: '1', name: 'CardBasic1'}]);
  });

  it('returns empty array if category not found', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {category: 'NonExistentCategory'},
    });

    (useCardStore as unknown as jest.Mock).mockReturnValue({
      cardsByCategory: {
        Basic: [{cardId: '1', name: 'CardBasic1'}],
      },
    });

    const {result} = renderHook(() => useDetailScreenData());

    expect(result.current.cards).toEqual([]);
  });
});
