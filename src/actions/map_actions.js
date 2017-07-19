import { REGION_SET, RESTAURANT_INPUT, ERROR } from './types';
import { Location, Permissions } from 'expo';
import { getPermissions } from './expo_common_helpers';
import { getLocationOptions, initialZoom } from '../CUSTOM_CONFIG';

export const setRegion = (region) => {
  return {
    type: REGION_SET,
    payload: region
  }
};

// Expo docs about 'Location' object: https://docs.expo.io/versions/v17.0.0/sdk/location.html
// May need to update vNumber.

export const getInitialRegion = () => async dispatch => {
    let status = await getPermissions('location');
    if (status === 'granted'){
      let location = await Location.getCurrentPositionAsync(getLocationOptions);
      if(location !== null){
        const { latitude, longitude } = location.coords;
        const { longitudeDelta, latitudeDelta } = initialZoom;
        const region = {
              latitude,
              longitude,
              longitudeDelta,
              latitudeDelta
            };
        return dispatch({
          type: REGION_SET,
          payload: region
        });
      } else {
        return dispatch({
          type: ERROR,
          payload: 'Location not found :('
        })
      }
    } else {
      return dispatch({
        type: ERROR,
        payload: 'Please enable Location Services!'
      })
    }
};

export const setInput = input => {
  return { type: RESTAURANT_INPUT, payload: input };
}

export const uploadInputToSearch = input => {

};