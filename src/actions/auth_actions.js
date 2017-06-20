import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';
import firebase from 'firebase';
import { 
  FACEBOOK_LOGIN_SUCCESS, 
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  ERROR
} from './types';
import { FACEBOOK_APP_ID } from '../secrets/FACEBOOK_SECRETS';
import { 
  androidClientId, 
  androidStandaloneAppClientId,
  iosClientId,
  iosStandaloneAppClientId
} from '../secrets/GOOGLE_SECRETS';
import { fbPermissions, googleScopes } from '../CUSTOM_CONFIG';

// How to use AsyncStorace:
//AsyncStorage.setItem('fb_token', token); (key, val)
//AsyncStorage.getItem('fb_token');
//returns promise

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    firebaseLogin(token, dispatch);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, fbPermissions);

  if(type ==='cancel'){
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  };
  firebaseLogin(token, dispatch);
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

const firebaseLogin = (token, dispatch) => {
  console.log('in Firebase Login!');
  let credential = firebase.auth.FacebookAuthProvider.credential(token);
  console.log('credential is', credential)
  
  firebase.auth().signInWithCredential(credential).catch(error => {
    return dispatch({ type: ERROR, payload: error });
  });
}

export const googleLogin = () => async dispatch => {
  let token = AsyncStorage.getItem('google_token');
  if (token) {
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: token});
  } else {
    doGoogleLogin(dispatch);
  }
};

const doGoogleLogin = async dispatch => {
  let { type, accessToken } = await Google.logInAsync({ 
    scopes: googleScopes, 
    androidClientId, 
    iosClientId, 
    iosStandaloneAppClientId, 
    androidStandaloneAppClientId
  });
  
  if(accessToken === 'cancel'){
    return dispatch({ type: GOOGLE_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('google_token', accessToken);
  dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: token });
};