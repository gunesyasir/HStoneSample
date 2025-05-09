import {renderHook, waitFor} from '@testing-library/react-native';
import {useFetchAllCards} from './useFetchAllCards';
import {apiClient} from '../network/apiClient';

jest.mock('../network/apiClient');

const mockedResponse = {
  data: {
    TestCategory1: [{cardId: 1, name: 'Card 1'}],
    TestCategory2: [{cardId: 2, name: 'Card 2'}],
    TestCategory3: [
      {
        cardId: 'RLK_Prologue_BT_036t',
        dbfId: 100831,
        name: 'Illidari Initiate',
        cardSet: 'Basic',
        type: 'Minion',
        cost: 1,
        attack: 1,
        health: 1,
        text: '<b>Rush</b>',
        artist: 'L. Lullabi & K. Turovec',
        playerClass: 'Demon Hunter',
        locale: 'enUS',
        mechanics: [
          {
            name: 'Rush',
          },
        ],
      },
    ],
  },
};

describe('useFetchAllCards hook', () => {
  it('fetches, flattens and sets data', async () => {
    (apiClient.fetchAllCards as jest.Mock).mockResolvedValueOnce(
      mockedResponse,
    );

    const {result} = renderHook(() => useFetchAllCards());

    await waitFor(() => {
      expect(result.current.data.length).toBe(3);
    });
  });
});
