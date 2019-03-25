import { createStackNavigator } from 'react-navigation';
import Home from './components/Home';
import Charge from './components/Charge';
import CardScan from './components/CardScan';

export const MainNavigator = createStackNavigator(
  {
    Home: Home,
    Charge: Charge,
    CardScan: CardScan
  },
  {
    initialRouteName: 'Home'
  }
);
