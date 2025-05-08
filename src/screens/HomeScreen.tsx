import * as React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes, RootStackParamList} from '../navigation/Routes.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, Routes.Home>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Pressable onPress={() => navigation.navigate(Routes.Detail, { title: 'Detay Sayfası' })} style={({ pressed }) => ({
        backgroundColor: pressed ? 'lightgray' : 'white',
      })}>
        <Text>Go to Detail Screen</Text>
      </Pressable>
    </View>
  );
}
