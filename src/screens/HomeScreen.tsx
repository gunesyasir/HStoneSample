import * as React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes, RootStackParamList} from '../navigation/Routes.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useHomeScreenData} from '../hooks/useHomeScreenData.ts';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Routes.Home
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {filteredCategories, searchText, setSearchText} = useHomeScreenData();

  return (
    <View style={styles.containerStyle}>
      <TextInput
        placeholder="Search categories..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredCategories}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate(Routes.Detail, {category: item})}
            style={{
              padding: 10,
              marginVertical: 8,
              marginHorizontal: 16,
              backgroundColor: 'rgb(225, 205, 205)',
            }}>
            <Text>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 20,
  },
  contentContainerStyle: {
    gap: 8,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
