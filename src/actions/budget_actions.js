import firebase from 'firebase';
import {
  BUDGET_STEP_CHANGED
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
    payload: step
  };
};

export const setBudgetId = () => {
  const budgetRef = firebase.database().ref('budgets').push();
}

export const getCatagories = () => {
  return (dispatch) => {
    firebase.database().ref('budgeting_catagories')
      .on('value', (snapshot) => {
        payload = snapshot.val();
        dispatch({
          type: CATAGORIES_AQUIRED,
          payload
        });
    });
  };
};

export const setBudgetKeyValue = (key, val) => {
  return {
    
  }
}