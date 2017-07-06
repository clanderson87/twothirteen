import {
  BUDGET_STEP_CHANGED,
  CATAGORIES_AQUIRED
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch(type){
    case BUDGET_STEP_CHANGED:
      let newState = { ...state, budgetStep: payload.step };
      payload.arg ? newState.specific = payload.arg : null;
      return newState;
    case CATAGORIES_AQUIRED:
      return { ...state, budgetCatagories: payload }
    default:
      return { ...state };
  };
};