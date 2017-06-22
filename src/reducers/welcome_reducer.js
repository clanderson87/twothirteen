import { HAS_USED } from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch(type){
    case HAS_USED:
      return { hasUsed: payload.hasUsed, token: payload.token };
    default:
      return state;
  }
}