import { StackNavigator } from 'react-navigation';
import AddOrEditNavigator from './AddOrEditNavigator';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';

const SubFlowStackNavigator = StackNavigator({
  Dashboard: { screen: DashboardScreen },
  Detail: { screen: SettingsScreen },
  AddTip: { screen: AddOrEditNavigator }
});

export default SubFlowStackNavigator;