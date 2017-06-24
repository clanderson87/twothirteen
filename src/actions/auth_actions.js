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

export const facebookLogin = (token = null) => async dispatch => {
  if(token === null){
    token = await AsyncStorage.getItem('fb_token');
  };
  if (token) {
    firebaseLogin(token, dispatch, 'facebook');
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
  firebaseLogin(token, dispatch, 'facebook');
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

const firebaseLogin = (token, dispatch, provider) => {
  let credential = new String();
  if (provider === 'facebook'){
    credential = firebase.auth.FacebookAuthProvider.credential(token);
  } else if (provider === 'google'){
    credential = firebase.auth.GoogleAuthProvider.credential(null, token);
  };

  firebase.auth().signInWithCredential(credential).catch(error => {
    const _error = handleFirebaseErrors(error);
    return dispatch({ type: ERROR, payload: _error });
  });
}

export const googleLogin = (token = null) => async dispatch => {
  if(token === null){
    token = await AsyncStorage.getItem('google_token');
  };
  if (token) {
    firebaseLogin(token, dispatch, 'google');
    return dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: token});
  } else {
    doGoogleLogin(dispatch);
  }
};

const doGoogleLogin = async dispatch => {
  let { type, accessToken } = await Google.logInAsync({ 
    scopes: googleScopes, 
    androidClientId, 
    iosClientId
  });
  
  if(accessToken === 'cancel'){
    return dispatch({ type: GOOGLE_LOGIN_FAIL });
  };

  firebaseLogin(accessToken, dispatch, 'google');
  await AsyncStorage.setItem('google_token', accessToken);
  return dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
};

const handleFirebaseErrors = error => {
  switch(error.code){
    case 'auth/app-deleted':
      return { error, type:'authError', message: 'Try again later, we\'ve got some shenanigans to fix. Sorry :(' };
    case 'auth/app-not-authorized':
      return { error, type:'authError', message: 'Somebody screwed up a migration. Bear with us, we\'ve gotta get with google and unfuck some things :(' };
    case 'auth/argument-error':
      return { error, type:'authError', message: 'Chris borked something in the code. He\'s the worst. It might take us some time to fix it. Sorry :( ' };
    case 'auth/invalid-api-key':
      return { error, type:'authError', message: 'Oh god, this should NEVER happen. This shouldn\'t take too long to fix, but someone IS getting fired' };
    case 'auth/invalid-user-token':
      return { error, type:'authError', message: 'It\'s an old code, and it doesn\'t check out. Please Reauthenticate.' };
    case 'auth/network-request-failed':
      return { error, type:'authError', message: 'Are you in a tunnel? Are we in a tunnel? Somebody\'s in a tunnel, because the interweb is down :(' };
    case 'auth/operation-not-allowed':
      return { error, type:'authError', message: 'Nope. Try again with an acceptable provider' };
    case 'auth/requires-recent-login':
      return { error, type:'authError', message: 'Hold on... '}; //make sure to set up firebase.user.reauthenticateWithCredential
    case 'auth/too-many-requests':
      return { error, type:'authError', message: 'Easy there Russia, you\'re behaving a lot like a bot. Give it a rest and come back later' };
    case 'auth/unauthorized-domain':
      return { error, type:'authError', message: 'You\'re not supposed to be there' };
    case 'auth/user-disabled':
      return { error, type:'authError', message: 'Sorry pumpkin, you\'re no longer welcome at our party. Contact the devs if you think you\'ve reached this in error.' }
    case 'auth/user-token-expired':
      return { error, type:'authError', message: 'Please sign in again.' };
    case 'auth/web-storage-unsupported':
      return { error, type:'authError', message: 'Web storage unsupported. We\'re gonna need that, thanks.' };
    case 'auth/account-exists-with-different-credential':
      return { error, type:'authError', message: `We found your account, but you didn't sign in with that provider last time. Please sign in with the correct provider!`}
  }
}