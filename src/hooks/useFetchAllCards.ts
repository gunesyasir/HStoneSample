import {useEffect, useState} from 'react';
import {apiClient} from '../network/apiClient.ts';
import {HearthstoneCard} from '../model/HearthStoneCard.ts';

export const useFetchAllCards = () => {
  const [data, setData] = useState<HearthstoneCard[]>([]);

  const fetchData = () => {
    apiClient
      .fetchAllCards()
      .then(response => {
        setData(Object.values(response.data).flat() as HearthstoneCard[]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {data};
};
