import { 
  REGION_SET,
  RESTAURANT_INPUT,
  SEARCH_SUCCESS,
  HIDE_RESULTS,
  SET_RESTAURANT,
  RESTAURANT_ADD_SUCCESS,
  ERROR
} from '../actions/types';

export default (state = {}, { type, payload}) => {
  switch(type){
    case REGION_SET:
      return { ...state, region: payload };
    case RESTAURANT_INPUT:
      return { ...state, input: payload };
    case SEARCH_SUCCESS:
      return { ...state, results: payload };
    case HIDE_RESULTS:
      let oldResults = state.results;
      return { ...state, results: null, oldResults };
    case SET_RESTAURANT:
      return { ...state, rest: payload };
    case RESTAURANT_ADD_SUCCESS:
      return { ...state, results: null, oldResults: null, rest: null, input: null };
    case ERROR:
      //console.log('in Map Reducer, error is', payload);
      return { ...state, error: payload };
    default:
      return state;
  }
};