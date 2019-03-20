import { createStackNavigator } from 'react-navigation';
import Home from './components/Home';
import Charge from './components/Charge';

export const MainNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Charge: {
    screen: Charge
  }
});
