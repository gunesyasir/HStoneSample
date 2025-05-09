import {HearthstoneCard} from '../model/HearthStoneCard.ts';

export enum Routes {
  Home = 'Home',
  Detail = 'Detail',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Detail]: {item: HearthstoneCard};
};
