import {renderHook, act, waitFor} from '@testing-library/react-native';
import {useHomeScreenData} from './useHomeScreenData.ts';
import {apiClient} from '../network/apiClient';
import {useCardStore} from '../state/useCardStore';

jest.mock('../network/apiClient');
jest.mock('../state/useCardStore');

describe('useHomeScreenData', () => {
  const mockSetCards = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCardStore as unknown as jest.Mock).mockReturnValue({
      cardsByCategory: {
        Classic: [],
        Basic: [],
        Demo: [],
      },
      setCards: mockSetCards,
    });

    (apiClient.fetchAllCards as jest.Mock).mockResolvedValue({
      data: {Classic: [], Basic: []},
    });
  });

  it('should fetch and set categories(cards) on mount', async () => {
    renderHook(() => useHomeScreenData());

    await waitFor(() => {
      expect(apiClient.fetchAllCards).toHaveBeenCalled();
      expect(mockSetCards).toHaveBeenCalledWith({Classic: [], Basic: []});
    });
  });


  it('should filter categories(cards) based on searchText', () => {
    const {result} = renderHook(() => useHomeScreenData());

    act(() => {
      result.current.setSearchText('bas');
    });

    expect(result.current.filteredCategories).toEqual(['Basic']);
  });
});

