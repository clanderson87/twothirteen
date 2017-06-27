import { AsyncStorage } from 'react-native';
import { HAS_USED } from './types';
import { versionNumber } from '../CUSTOM_CONFIG';

export const checkForUsage = () => async dispatch => {
  //AsyncStorage.multiRemove([versionNumber, 'fb_token', 'google_token']) //=> for debugging purposes ONLY!

  let hasUsed = await AsyncStorage.getItem(versionNumber);
  let token = await AsyncStorage.getItem('fb_token');
  if (!token){
    token = await AsyncStorage.getItem('google_token');
  }

  console.log('checkForUsage()! hasUsed = ', hasUsed)

  let action = { type: HAS_USED, payload: { hasUsed, token } };

  console.log('action is', action)
  if(!hasUsed) {
    dispatch(action);
    AsyncStorage.setItem(versionNumber, 'true');
  } else {
    dispatch(action);
  }
};