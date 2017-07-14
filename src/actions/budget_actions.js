import firebase from 'firebase';
import {
  BUDGET_STEP_CHANGED,
  CATAGORIES_AQUIRED,
  BUDGET_ITEM_AFFECTED,
  BUDGET_ITEM_ADDED_SUCCESS,
  BUDGET_ITEM_ADDED_FAILED,
  DISPLAY_PICKER,
  HIDE_PICKER,
  ERROR
} from './types';

export const setBudgetStep = (step, arg = null) => {
  let payload = {};
  if(!arg){
    payload = { step };
  } else {
    payload = { step, arg }
  }
  return {
    type: BUDGET_STEP_CHANGED,
    payload
  };
};

export const setBudgetItem = () => {
  const budgetItemId = firebase.database().ref('budgets').push();
}

export const getCatagories = () => {
  return (dispatch) => {
    firebase.database().ref('budgeting_catagories')
      .on('value', (snapshot) => {
        dispatch({
          type: CATAGORIES_AQUIRED,
          payload: Object.values(snapshot.val())
        });
    });
  };
};

export const affectBudgetItem = (key, val, obj) => {
  obj[key] = val;
  return {
    type: BUDGET_ITEM_AFFECTED,
    payload: obj
  }
}

//With swipeDeck architecture, perhaps package all budgetItems before we

export const uploadBudgetItem = budgetItem => {
  const biId = firebase.database().ref('budgetItems').push();
  budgetItem.date = budgetItem.date.getTime();
  budgetItem.amount = parseInt(budgetItem.amount);
  budgetItem.uuid = firebase.auth().currentUser.uid;
  budgetItem.biId = biId.key;
  
  return (dispatch) => {
    const successAddAction = () => {
      dispatch({
        type: BUDGET_ITEM_ADDED_SUCCESS
      });
      //navigate here!
    };

    const failAddAction = (err) => {
      dispatch({
        type: BUDGET_ITEM_ADDED_FAILED,
        payload: err
      });
    };
    firebase.database().ref('budgetItems')
      .push(budgetItem)
        .then(() => successAddAction())
        .catch((err) => failAddAction(err));
  }
}

export const showPicker = arg => {
  let type = null;
  arg ? type = DISPLAY_PICKER : type = HIDE_PICKER;
  return { type };
}