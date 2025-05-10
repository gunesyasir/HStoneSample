import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen.tsx';
import DetailScreen from '../screens/DetailScreen.tsx';
import {Routes} from './Routes.ts';

const RootStack = createNativeStackNavigator({
  initialRouteName: Routes.Home,
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: '',
      },
    },
    Detail: {
      screen: DetailScreen,
      options: ({route}) => ({
        title: route.params?.category,
      }),
    },
  },
});

export default RootStack;
