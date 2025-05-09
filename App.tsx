import React from 'react';
import {useColorScheme} from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  createStaticNavigation,
} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import AppStateComponent from './src/components/AppStateComponent';

const LightAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(245, 245, 245)',
    primary: 'rgb(80, 80, 80)',
  },
};

const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'rgb(28, 28, 30)',
    primary: 'rgb(255, 55, 95)',
  },
};

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? DarkAppTheme : LightAppTheme;

  return (
    <>
      <Navigation theme={theme} />
      <AppStateComponent />
    </>
  );
}
