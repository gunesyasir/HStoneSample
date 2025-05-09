import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useNetworkStore} from '../state/useNetworkStore.ts';

export default function AppStateComponent() {
  const {isLoading, hasError, errorMessage, hasRetry, triggerRetry} =
    useNetworkStore();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.centered}>
        {hasRetry ? (
          <Pressable onPress={triggerRetry}>
            <Text>Yeniden Dene"</Text>
          </Pressable>
        ) : (
          <Text style={styles.errorText}>Error: {errorMessage}</Text>
        )}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  centered: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  errorText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
