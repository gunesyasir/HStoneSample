import {create} from 'zustand';
import {HearthstoneCard} from '../model/HearthStoneCard.ts';

type CardStore = {
  cardsByCategory: Record<string, HearthstoneCard[]>;
  setCards: (cards: Record<string, HearthstoneCard[]>) => void;
};

export const useCardStore = create<CardStore>(set => ({
  cardsByCategory: {},
  setCards: cards => set({cardsByCategory: cards}),
}));
