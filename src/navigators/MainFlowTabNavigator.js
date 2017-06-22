import { TabNavigator } from 'react-navigation';
import MapScreen from '../screens/MapScreen'; 
import SubFlowStackNavigator from './SubFlowStackNavigator';

const MainFlowTabNavigator = TabNavigator({
  Map: { screen: MapScreen },
  Dashboard: { screen: SubFlowStackNavigator }
});

export default MainFlowTabNavigator;