import { 
  REGION_SET,
  RESTAURANT_INPUT,
  SEARCH_SUCCESS,
  HIDE_RESULTS,
  SET_RESTAURANT,
  RESTAURANT_ADD_SUCCESS,
  ERROR,
  RESET_RESTAURANT_SELECTION,
  DISPLAY_MORE_RESULTS
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch(type){
    case REGION_SET:
      return { ...state, region: payload };
    case RESTAURANT_INPUT:
      let nextState = { ...state, input: payload };
      if(nextState.input.length < 3){
        nextState.results = null;
        nextState.fullResults = null;
        nextState.previous = null;
      }
      return nextState;
    case SEARCH_SUCCESS:
      let newState = { ...state, results: payload.initialSet };
      if(payload.remaining){
        newState.fullResults = payload.remaining;
      };
      return newState;
    case HIDE_RESULTS:
      let oldResults = state.results;
      return { ...state, results: null, oldResults };
    case SET_RESTAURANT:
      return { ...state, rest: payload };
    case RESTAURANT_ADD_SUCCESS:
      return { ...state, results: null, oldResults: null, rest: null, input: null };
    case RESET_RESTAURANT_SELECTION:
      return { ...state, results: payload, oldResults: null, rest: null };
    case DISPLAY_MORE_RESULTS:
      let previous = state.results;
      let newResults = state.fullResults[0];
      state.fullResults.shift();
      return { ...state, results: newResults, previous };
    case ERROR:
      console.log('in Map Reducer, error is', payload);
      return { ...state, error: payload };
    default:
      return state;
  }
};