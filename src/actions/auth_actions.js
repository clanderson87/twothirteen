import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';
import firebase from 'firebase';
import { 
  FACEBOOK_LOGIN_SUCCESS, 
  FACEBOOK_LOGIN_FAIL,
  TOKEN_FOUND,
  TOKEN_NOT_FOUND,
  FIREBASE_AUTHENTICATED,
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
  console.log('firebase login being called!');
  let credential = new String();
  if (provider === 'facebook'){
    credential = firebase.auth.FacebookAuthProvider.credential(token);
  } else if (provider === 'google'){
    console.log('provider is', provider);
    credential = firebase.auth.GoogleAuthProvider.credential(null, token);
    console.log('credential is', credential);
  };

  firebase.auth().signInWithCredential(credential)
    .then(() => { 
      console.log('firebase Authentication success!')
      return dispatch({
          type: FIREBASE_AUTHENTICATED
        })
      }
    )
    .catch(error => {
      const _error = handleFirebaseErrors(error, provider);
      console.log('_error passed to redux is:', _error);
      return dispatch({ type: ERROR, payload: _error });
    });
}

export const googleLogin = (token = null) => async dispatch => {
  if(token === null){
    token = await AsyncStorage.getItem('google_token');
  };
  if (token) {
    firebaseLogin(token, dispatch, 'google');
    console.log('from googleLogin');
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
  console.log('from doGoogleLogin')
  return dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
};

export const testForTokens = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  let provider = 'facebook';
  if (!token){
    token = await AsyncStorage.getItem('google_token');
    provider = 'google';
    if(!token){
      provider = null;
      return dispatch({ type: TOKEN_NOT_FOUND });
    }
  };

  if(token && provider !== null){
    return dispatch({ type: TOKEN_FOUND, payload: { token, provider } });
  }
};

const deleteTokens = async () => {
  await AsyncStorage.multiRemove(['fb_token', 'google_token']);
}

const handleFirebaseErrors = async (error, provider) => {
  console.log('In HFE, Error is', error);
  console.log('in HFE, Error.code is', error.code);
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
      await deleteTokens();
      return { error, type:'authError', message: 'It\'s an old code, and it doesn\'t check out. Please Reauthenticate.' };
    case 'auth/network-request-failed':
      await deleteTokens();
      return { error, type:'authError', message: 'Are you in a tunnel? Are we in a tunnel? Somebody\'s in a tunnel, because the interweb is down :(' };
    case 'auth/operation-not-allowed':
      await deleteTokens();
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
      await deleteTokens();
      return { error, type:'authError', message: 'Please sign in again.' };
    case 'auth/web-storage-unsupported':
      return { error, type:'authError', message: 'Web storage unsupported. We\'re gonna need that, thanks.' };
    case 'auth/account-exists-with-different-credential':
      if(provider === 'facebook'){
        await AsyncStorage.removeItem('fb_token');
      } else if(provider === 'google'){
        await AsyncStorage.removeItem('google_token');
      }
      return { error, type:'authError', message: `We found your account, but you didn't sign in with that provider last time. Please sign in with the correct provider!`}
    case 'auth/internal-error':
      await deleteTokens();
      return { ...error, type: 'authError', message: 'Something weird happened on our end. Please try to sign in again and we\'ll try to not suck so much :('}
  }
}