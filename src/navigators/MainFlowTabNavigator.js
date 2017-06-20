import { TabNavigator } from 'react-navigation';
import CameraScreen from '../screens/CameraScreen';
import MapScreen from '../screens/MapScreen'; 
import DeckScreen from '../screens/DeckScreen';
import AudioScreen from '../screens/AudioScreen';
import BarCodeScannerScreen from '../screens/BarCodeScannerScreen';
import SubFlowStackNavigator from './SubFlowStackNavigator';

const MainFlowTabNavigator = TabNavigator({
  //camera: { screen: CameraScreen },
  map: { screen: MapScreen },
  //barCode: { screen: BarCodeScannerScreen },
  record: { screen: AudioScreen },
  review: { screen: SubFlowStackNavigator }
});

export default MainFlowTabNavigator;