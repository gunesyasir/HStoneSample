export type HearthstoneCard = {
  cardId: string;
  cardSet?: string;
  dbfId?: number;
  locale?: string;
  name?: string;
  type?: string;
  playerClass?: string;
  text?: string;
  artist?: string;
  attack?: number;
  cost?: number;
  elite?: boolean;
  flavor?: string;
  health?: number;
};
