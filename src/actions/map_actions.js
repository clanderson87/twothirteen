import { REGION_SET, RESTAURANT_INPUT, ERROR, SEARCH_SUCCESS } from './types';
import { Location, Permissions } from 'expo';
import firebase from 'firebase';
import { OS } from '../styles';
import { getPermissions } from './expo_common_helpers';
import { getLocationOptions, initialZoom } from '../CUSTOM_CONFIG';
import { AWS_URL, iOSKey, androidKey } from '../secrets/AWS_URL.js';

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

const sanitizeInput = input => {
  input = input.replace(' ', '%20');
  return input;
};

export const uploadInputToSearch = (requestTerm, region = null) => dispatch => {
  requestTerm = sanitizeInput(requestTerm);
  let body = {
    requestTerm,
    type: 'restaurant',
    radius: 50000,
    authenticate: firebase.auth().currentUser ? true : false,
    longitude: null,
    latitude: null,
    denyPermission: true    
  };

  region !== null ? (
    body.denyPermission = false, 
    body.latitude = region.latitude, 
    body.longitude = region.longitude
  ) : null;
  //headers = JSON.stringify(headers);
  console.log('body is now:', body);
  let type = '';
  let payload = {};
  const dispatchAction = () => dispatch({type, payload});
  fetch(AWS_URL, {
      method: 'POST',
      headers: {
        'x-api-key': OS === 'android' ? androidKey : iOSKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then((resp) => {
      console.log(resp);
      type = SEARCH_SUCCESS;
      payload = resp;
      dispatchAction();
    })
    .catch(err => {
      console.log('in uploadInputToSearch, error is ', err)
      type = ERROR;
      payload = err;
      dispatchAction();
    });
};