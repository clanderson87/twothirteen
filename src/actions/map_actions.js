import { REGION_SET, 
  RESTAURANT_INPUT, 
  ERROR, 
  SEARCH_SUCCESS, 
  HIDE_RESULTS, 
  SET_RESTAURANT, 
  RESTAURANT_ADD_SUCCESS,
  RESET_RESTAURANT_SELECTION,
  DISPLAY_MORE_RESULTS
} from './types';
import { Location, Permissions } from 'expo';
import firebase from 'firebase';
import axios from 'axios';
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
        console.log(location)
        const { latitude, longitude } = location.coords;
        const { longitudeDelta, latitudeDelta } = initialZoom;
        const region = {
              latitude,
              longitude,
              longitudeDelta,
              latitudeDelta
            };
        console.log(region)
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
  input = input.replace(/\s/g, '%20');
  return input;
};

const breakUpPayload = array => {
  let payload = [];
  for(let i = 0; i < array.length; i += 5){
    payload.push(array.slice(i, i + 5))
  }
  console.log('payload is', payload);
  return payload;
}

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

  headers = {
    'x-api-key': OS === 'android' ? androidKey : iOSKey,
    'Content-Type': 'application/json'
  }

  body = JSON.stringify(body);

  let type = '';
  let payload = {};
  const dispatchAction = () => dispatch({type, payload});
  
  console.log(body);

  axios.post(AWS_URL, body, {headers})
    .then((resp) => {
      console.log('resp.data is:', resp.data);
      type = SEARCH_SUCCESS;
      if(resp.data.length > 5){
        let fullPayload = breakUpPayload(resp.data);
        payload = { initialSet: fullPayload[0] };
        fullPayload.shift();
        payload.remaining = fullPayload;
        console.log(payload);
      } else {
        payload = { initialSet: resp.data };
      }
      dispatchAction();
    })
    .catch((err) => {
      console.log(err);
      if(err.response.status === 404){
        type = SEARCH_SUCCESS;
        payload = [{ name: 'No results', address: 'We couldn\'t find anything by that name nearby :(', clear: true }];
      } else {
        type = ERROR;
        payload = err;
      }
      dispatchAction();
    });
};

export const hideResults = () => {
  return {
    type: HIDE_RESULTS
  }
};

export const setRestaurant = rest => {
  return {
    type: SET_RESTAURANT,
    payload: rest
  }
};

export const saveRestaurant = rest => async dispatch => {
  const { gId, name } = rest;
  
  let type = '';
  let payload = {};

  const { currentUser } = firebase.auth();

  const initialAdd = () => {
    firebase.database().ref('restaurants').push({name, gId});
  };

  const dispatchAction = () => {
    dispatch({type, payload});
  };

  firebase.database().ref(`users/${currentUser.uid}/restaurants`).push({ name, gId })
    .then(
      firebase.database().ref('restaurants')
        .orderByChild('gId')
        .equalTo(gId)
        .once('value')
        .then(snapshot => {
          if (!snapshot.exists()){
            initialAdd();
          }
        },
        type = RESTAURANT_ADD_SUCCESS,
        dispatchAction()
    ))
      .catch(err => {
        type = ERROR;
        payload = err;
        dispatchAction()
      }) 
};

export const resetRestaurantSelection = arg => {
  return {
    type: RESET_RESTAURANT_SELECTION,
    payload: arg
  }
};

export const displayMoreResults = () => {
  return {
    type: DISPLAY_MORE_RESULTS
  }
}