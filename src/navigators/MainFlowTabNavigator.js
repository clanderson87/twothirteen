import { TabNavigator } from 'react-navigation';
import MapScreen from '../screens/MapScreen';
import SubFlowStackNavigator from './SubFlowStackNavigator';
import AddOrEditNavigator from './AddOrEditNavigator';

const MainFlowTabNavigator = TabNavigator({
  Dashboard: { screen: SubFlowStackNavigator },
  Map: { screen: MapScreen },
});

export default MainFlowTabNavigator;