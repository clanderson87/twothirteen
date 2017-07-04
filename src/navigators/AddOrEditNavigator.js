import { StackNavigator } from 'react-navigation';
import AddScreen from '../screens/AddScreen';

const options = {
    mode: 'modal',
    headerMode: 'none'
}

const AddOrEditNavigator = StackNavigator({
  AddTip: { screen: AddScreen }
}, options);

export default AddOrEditNavigator;