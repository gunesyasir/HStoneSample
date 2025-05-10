import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList, Routes} from '../navigation/Routes.ts';
import {useCardStore} from '../state/useCardStore.ts';

type ScreenRouteProp = RouteProp<RootStackParamList, Routes.Detail>;

export default function DetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const {category} = route.params;
  const {cardsByCategory} = useCardStore();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={cardsByCategory[category]}
        contentContainerStyle={{flexGrow: 1, padding: 20, gap: 8}}
        keyExtractor={item => item.cardId}
        renderItem={({item}) => (
          <View
            style={{
              padding: 10,
              marginVertical: 8,
              marginHorizontal: 16,
              backgroundColor: 'rgb(225, 205, 205)',
            }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
