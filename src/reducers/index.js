import { combineReducers } from 'redux';
import auth from './auth_reducer';
import welcome from './welcome_reducer'
import map from './map_reducer';
import camera from './camera_reducer';
import barCode from './bar_code_reducer';
import audio from './audio_reducer';

export default combineReducers({
  auth,
  welcome,
  map,
  camera,
  barCode,
  audio
});