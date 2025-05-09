import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {HearthstoneCard} from '../model/HearthStoneCard.ts';

type Props = {
  item: HearthstoneCard;
  onPress: () => void;
};

export function HearthstoneCardItem({item, onPress}: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'green',
  },
});
