import {
  BUDGET_STEP_CHANGED,
  CATAGORIES_AQUIRED,
  BUDGET_ITEM_AFFECTED,
  BUDGET_ITEM_ADDED_FAILED,
  BUDGET_ITEM_ADDED_SUCCESS,
  DISPLAY_PICKER,
  HIDE_PICKER,
  MORE_CARDS_ADDED,
  ERROR
} from '../actions/types';

let INITIAL_BUDGET_ITEM = { freq: null, date: new Date(), amount: 300 }

let INITIAL_STATE = {
  budgetItem: INITIAL_BUDGET_ITEM,
  picker: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
  console.log('in budget_reducer, type is:', type);
  console.log('payload is:', payload);
  switch(type){
    case BUDGET_STEP_CHANGED:
      let newState = { ...state, budgetStep: payload.step };
      payload.arg ? newState.specific = payload.arg : null;
      return newState;
    case CATAGORIES_AQUIRED:
      return { ...state, budgetCatagories: payload }
    case BUDGET_ITEM_AFFECTED:
      let nextState = { ...state, budgetItem: null }
      nextState.budgetItem = payload;
      return nextState;
    case BUDGET_ITEM_ADDED_SUCCESS:
      return { ...state, budgetItem: INITIAL_BUDGET_ITEM };
    case DISPLAY_PICKER:
      return { ...state, picker: true };
    case HIDE_PICKER:
      return { ...state, picker: false };
    case MORE_CARDS_ADDED:
      return { ...state, budgetCatagories: payload };
    default:
      return { ...state };
  };
};