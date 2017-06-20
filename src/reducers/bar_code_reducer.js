import { BAR_CODE_READ, ERROR } from '../actions/types';

export default (state = {}, {type, payload}) => {
  switch(type){
    case BAR_CODE_READ:
      return { ...state, data: payload };
    case ERROR:
      return { ...state, error: payload };
    default:
      return { ...state };
  }
};