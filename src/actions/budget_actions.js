import firebase from 'firebase';
import {
  BUDGET_STEP_CHANGED,
  CATAGORIES_AQUIRED,
  BUDGET_ITEM_AFFECTED,
  BUDGET_ITEM_ADDED_SUCCESS,
  BUDGET_ITEM_ADDED_FAILED,
  DISPLAY_PICKER,
  HIDE_PICKER,
  MORE_CARDS_ADDED,
  UIALERT_DISABLED,
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
      .once('value', (snapshot) => {
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

export const uploadBudgetItem = (budgetItem, type, arg = null) => {
  const biId = firebase.database().ref('budgetItems').push();
  budgetItem.type = type;
  budgetItem.uuid = firebase.auth().currentUser.uid;
  budgetItem.biId = biId.key;
  if(arg !== null){
    budgetItem.void = true;
    budgetItem.amount = 0;
    budgetItem.freq = null;
    budgetItem.date = null;
  } else {
    if(budgetItem.freq === null){
      budgetItem.freq = 'monthly'
    };
    budgetItem.date = budgetItem.date.getTime();
    budgetItem.amount = parseInt(budgetItem.amount);
  }
  
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
};


export const addMoreMiscCards = () => {
  let moreCards = [
    { id: 'kjhbhlilblkjl', title: 'Misc 1', misc: true }, 
    { id: '[pqwoieghpwodn', title: 'Misc 2', misc: true },
    { id: 'LIBWFLIJSFASFDASD', title: 'Misc 3', misc: true }
  ];

  return { type: MORE_CARDS_ADDED, payload: moreCards };
}

export const disableUIAlert = () => {
  return { type: UIALERT_DISABLED };
}