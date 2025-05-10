import {RouteProp, useRoute} from '@react-navigation/native';
import {useCardStore} from '../state/useCardStore';
import {RootStackParamList, Routes} from '../navigation/Routes.ts';

type ScreenRouteProp = RouteProp<RootStackParamList, Routes.Detail>;

export function useDetailScreenData() {
  const route = useRoute<ScreenRouteProp>();
  const {category} = route.params;
  const {cardsByCategory} = useCardStore();

  const cards = cardsByCategory[category] || [];

  return {cards};
}
