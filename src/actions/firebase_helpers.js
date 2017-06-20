import firebase from 'firebase';

const SUCCESS = 'success';
const FAIL = 'fail';

const successAddAction = item => {
  console.log(item);
  return {
    type: SUCCESS,
    payload: item
  }
}

const failAddAction = err => {
  return {
    type: FAIL,
    payload: err
  }
}

/*---------------------------- EXPORTED METHODS -----------------------------*/

export const getUsersInitialItems = key => {
  const { currentUser } = firebase.auth();   
  firebase.database().ref(`users/${currentUser.uid}/${key}`)
    .on('value', snapshot => successAddAction(snapshot.val()));
};

export const addItemToUser = (item, key) => {
  const { currentUser } = firebase.auth();
  const fbRef = firebase.database();
  const id = firebase.database().ref(key).push().key;
  item.id = id;
  const initialAdd = item => {
    fbRef.ref(key).push(item);
  };
  fbRef.ref(`users/${currentUser.uid}/${key}`) //adding to user's items
    .push(id) // this works when an outside service like google is providing a unique id, but not when firebase is assigning an id upon upload.
      .then(
        fbRef.ref(key)
          .orderByChild('id')
          .equalTo(id)
          .once('value')
          .then(snapshot => {
            if(snapshot.exists() === false){
              initialAdd(item);
            };
          }),
        successAddAction(item)
      )
      .catch(err => failAddAction(err))
};

export const deleteUsersItem = ({id, name}, key) => {
  const { currentUser } = firebase.auth();
  firebase.database().ref(`users/${currentUser.uid}/${key}`)
    .orderByChild('id').equalTo(id)
      .once('child_added', 
        snapshot => snapshot.ref.remove()
        .then(() => successAction(null))
    );
};

export const editUsersItem = (newItem, key) => {
  const QueryLoc = firebase.database().ref(key);
  QueryLoc.orderByChild('id').equalTo(newItem.id).on('child_added', snapshot => {
    const oldItem = snapshot.val();
    const newItemKeys = Object.keys(newItem);
    const loc = snapshot.ref;
    let updated = { ...oldItem }
    newItemKeys.forEach(_key => {
      updated[_key] = newItem[_key];
    });
    loc.set(updated).then(
        () => successAction(item)
      );
  });
};