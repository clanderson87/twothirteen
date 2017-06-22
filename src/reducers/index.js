import { combineReducers } from 'redux';
import auth from './auth_reducer';
import welcome from './welcome_reducer'
import map from './map_reducer';
import dashboard from './dashboard_reducer';


export default combineReducers({
  auth,
  welcome,
  map,
  dashboard
});