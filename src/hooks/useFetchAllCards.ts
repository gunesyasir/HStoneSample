import {useEffect, useState} from 'react';
import {apiClient} from '../network/apiClient.ts';
import {HearthstoneCard} from '../model/HearthStoneCard.ts';

export const useFetchAllCards = () => {
  const [data, setData] = useState<HearthstoneCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const fetchData = () => {
    apiClient
      .fetchAllCards()
      .then(response => {
        setData(Object.values(response.data).flat() as HearthstoneCard[]);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {data, isLoading, error};
};
