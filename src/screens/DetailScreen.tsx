import * as React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useDetailScreenData} from '../hooks/useDetailScreenData.ts';

export default function DetailScreen() {
  const {cards} = useDetailScreenData();

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        contentContainerStyle={styles.contentContainer}
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

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  contentContainer: {flexGrow: 1, padding: 20, gap: 8},
});
