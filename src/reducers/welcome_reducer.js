import { HAS_USED } from '../actions/types';

export default (state = { loading: true }, { type, payload }) => {
  switch(type){
    case HAS_USED:
      return { hasUsed: payload.hasUsed, token: payload.token, loading: false };
    default:
      return state;
  }
}