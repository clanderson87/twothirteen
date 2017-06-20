import { 
  FACEBOOK_LOGIN_SUCCESS, 
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch(type){
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case GOOGLE_LOGIN_SUCCESS:
      return { token: payload };
    case GOOGLE_LOGIN_FAIL:
      return { token: null };
    default: 
      return state;
  }
}