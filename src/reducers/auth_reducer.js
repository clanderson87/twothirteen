import { 
  FACEBOOK_LOGIN_SUCCESS, 
  FACEBOOK_LOGIN_FAIL,
  TOKEN_FOUND,
  FIREBASE_AUTHENTICATED,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  ERROR
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  console.log('type is ', type);
  console.log('payload is ', payload);
  switch(type){
    case TOKEN_FOUND:
      return { ...state, loading: true, token: payload.token, provider: payload.provider }
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: payload };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null };
    case FIREBASE_AUTHENTICATED: 
      return { ...state, authenticated: true }
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, token: payload };
    case GOOGLE_LOGIN_FAIL:
      return { ...state, token: null };
    case ERROR:
      console.log('in Auth Reducer, error is', payload);
      return { ...state, token: null, error: payload, provider: null }
    default: 
      return state;
  }
}