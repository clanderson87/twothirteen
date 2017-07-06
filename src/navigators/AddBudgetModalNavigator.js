import { StackNavigator } from 'react-navigation';
import AddBudgetScreen from '../screens/AddBudgetScreen';

const AddBudgetModalNavigator = StackNavigator({
  AddBudget: { screen: AddBudgetScreen },
  //EditBudgetScreen: { screen: EditBudgetScreen }
});

export default AddBudgetModalNavigator;