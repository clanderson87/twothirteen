import { StackNavigator } from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';

const SubFlowStackNavigator = StackNavigator({
  Dash: { screen: DashboardScreen },
  Detail: { screen: SettingsScreen },
});

export default SubFlowStackNavigator;