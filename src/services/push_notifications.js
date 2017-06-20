import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { getPermissions } from '../actions/expo_common_helpers';
import { PUSH_ENDPOINT } from '../CUSTOM_CONFIG';

const key = 'pushtoken';

export default async () => {
  let previousToken = await AsyncStorage.getItem(key);
  console.log('previousToken is ', previousToken); // This is for debugging purposes - remove in production!
  if (previousToken) {
    return;
  } else {
    let status = await getPermissions(Permissions.NOTIFICATIONS);
    
    if(status !=='granted'){
      return;
    };

    let token = await Notifications.getExponentPushTokenAsync();
    await axios.post(PUSH_ENDPOINT, {token: { token }});
    AsyncStorage.setItem(key, token);
  }
}