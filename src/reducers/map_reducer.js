import { REGION_SET, ERROR } from '../actions/types';

export default (state = {}, { type, payload}) => {
  switch(type){
    case REGION_SET:
      return { ...state, region: payload };
    case ERROR:
      console.log('in Map Reducer, error is', payload);
      return { ...state, error: payload };
    default:
      return state;
  }
};