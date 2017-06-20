import { HAS_USED } from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch(type){
    case HAS_USED:
      console.log('payload is', payload)
      return { hasUsed: payload.hasUsed, token: payload.token };
    default:
      return state;
  }
}