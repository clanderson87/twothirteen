import { StackNavigator } from 'react-navigation';
import ReviewScreen from '../screens/ReviewScreen';
import SettingsScreen from '../screens/SettingsScreen'; 

const SubFlowStackNavigator = StackNavigator({
  review: { screen: ReviewScreen },
  settings: { screen: SettingsScreen }
});

export default SubFlowStackNavigator;