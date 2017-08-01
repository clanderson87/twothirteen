import { 
  REGION_SET,
  RESTAURANT_INPUT,
  SEARCH_SUCCESS,
  ERROR
} from '../actions/types';

export default (state = {}, { type, payload}) => {
  switch(type){
    case REGION_SET:
      return { ...state, region: payload };
    case RESTAURANT_INPUT:
      return { ...state, input: payload };
    case SEARCH_SUCCESS:
      return { ...state, results: payload }
    case ERROR:
      //console.log('in Map Reducer, error is', payload);
      return { ...state, error: payload };
    default:
      return state;
  }
};