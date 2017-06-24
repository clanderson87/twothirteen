import { 
  FACEBOOK_LOGIN_SUCCESS, 
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  ERROR
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch(type){
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: payload };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null };
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, token: payload };
    case GOOGLE_LOGIN_FAIL:
      return { ...state, token: null };
    case ERROR:
      console.log('in Auth Reducer, error is', payload);
      return { ...state, token: null, error: payload }
    default: 
      return state;
  }
}