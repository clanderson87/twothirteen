import { 
  FACEBOOK_LOGIN_SUCCESS, 
  FACEBOOK_LOGIN_FAIL,
  TOKEN_FOUND,
  TOKEN_NOT_FOUND,
  FIREBASE_AUTHENTICATED,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  ERROR
} from '../actions/types';

export default (state = {loading: true}, { type, payload }) => {
  switch(type){
    case TOKEN_FOUND:
      return { ...state, loading: true, token: payload.token, provider: payload.provider }
    case TOKEN_NOT_FOUND:
      return { ...state, loading: false }
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: payload, loading: true };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null };
    case FIREBASE_AUTHENTICATED: 
      return { ...state, authenticated: true, error: null }
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, token: payload, loading: true };
    case GOOGLE_LOGIN_FAIL:
      return { ...state, token: null };
    case ERROR:
      return { ...state, token: null, error: payload, provider: null, loading: false, message: payload.message }
    default: 
      return state;
  }
}