import {useEffect, useMemo, useState} from 'react';
import {apiClient} from '../network/apiClient.ts';
import {useCardStore} from '../state/useCardStore.ts';

export const useHomeScreenData = () => {
  const {cardsByCategory, setCards} = useCardStore();
  const [searchText, setSearchText] = useState('');

  const fetchData = () => {
    apiClient.fetchAllCards().then(response => {
      setCards(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCategories = useMemo(() => {
    // Avoiding unnecessary filtering on every render.
    return Object.keys(cardsByCategory).filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [cardsByCategory, searchText]);

  return {
    filteredCategories,
    searchText,
    setSearchText,
  };
};
