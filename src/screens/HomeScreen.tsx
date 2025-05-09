import * as React from 'react';
import {Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes, RootStackParamList} from '../navigation/Routes.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFetchAllCards} from '../hooks/useFetchAllCards.ts';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Routes.Home
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {data} = useFetchAllCards();

  return (
    <FlatList
      data={data}
      contentContainerStyle={{flexGrow: 1, padding: 20, gap: 8}}
      keyExtractor={item => item.cardId.toString()}
      renderItem={({item}) => <Text>{item.name}</Text>}
    />
  );
}
