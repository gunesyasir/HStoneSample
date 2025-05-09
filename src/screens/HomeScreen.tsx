import * as React from 'react';
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
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
  const {data, isLoading, error} = useFetchAllCards();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data}
      contentContainerStyle={{flexGrow: 1, padding: 20, gap: 8}}
      keyExtractor={item => item.cardId.toString()}
      renderItem={({item}) => (
        <Text>{item.name}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
