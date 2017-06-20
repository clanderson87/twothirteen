import { IMAGE_SELECTED, IMAGE_CANCELLED, TOGGLE_PICKER, ERROR } from '../actions/types';

const INITIAL_STATE = { picker: false };

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type){
    case IMAGE_SELECTED:
      console.log('Action:', type, payload, state);
      return { ...state, image: payload };
    case IMAGE_CANCELLED:
      console.log('Action:', type, state);
      return { ...state };
    case ERROR:
      console.log('error is', payload, "state is", state);
      return { ...state, error: payload };
    case TOGGLE_PICKER:
      return { ...state, picker: payload }
    default:
      return { ...state }
  };
};