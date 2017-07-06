import { 
  GET_INITIAL,
  RESTAURANTS_AQUIRED,
  ADD_TIP_SUCCESS,
  ADD_TIP_FAIL,
  DELETE_TIP,
  TIP_SELECTED,
  TIP_UNSELECTED,
  TIP_SHIFT_CHANGED,
  TIP_RESTAURANT_CHANGED,
  TIP_DATE_CHANGED,
  TIP_AMOUNT_CHANGED,
  TIP_NOTES_CHANGED,
  TIP_RATING_CHANGED,
  STEP_CHANGED
} from '../actions/types';

const DUMMY_RESTAURANTS = [{
  name: 'FAKE GRILL',
  gId: 'FAKE GID',
  imageUrl: 'http://placekitten.com/200/300',
  address: '1111 FAKE ST'
}/*,
{
  name: 'BARLIES',
  gId: 'NOPE',
  imageUrl: 'http://placekitten.com/300/420',
  address: '12345 BUTT LANE'
}*/
]

const INITIAL_STATE = { 
  usersTips: [],
  usersAverage: 100,
  usersProjected: null,
  usersRestaurants: DUMMY_RESTAURANTS,
  message: '',
  tipAmount: null,
  tipDate: null,
  tipShift: "Lunch",
  tipRestaurant: '', //NB: once RESTAURANTS_AQUIRED fires, tipRestaurant shouldn't be defaulted back to null
  tipNotes: '',
  tipRating: 3,
  step: 'amount needed',
  selectedTip: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch(type){
    case GET_INITIAL:
      return { ...state, usersTips: payload.tips, usersAverage: payload.avg, usersHourlyAvg: payload.hourlyAvg };
    case RESTAURANTS_AQUIRED:
      return { ...state, usersRestaurants: payload, tipRestaurant: payload[0].gId }
    case ADD_TIP_SUCCESS:
      return { ...state, 
        message: payload.message,
        tipAmount: null,
        navigateTo: 'Dashboard',
        step: 'amount needed'
      };
    case ADD_TIP_FAIL:
      return { ...state, message: payload.message };
    case DELETE_TIP:
      return { ...state, message: payload.message }
    case TIP_SELECTED:
      return { ...state, 
        selectedTip: payload, 
        tipAmount: payload.amount, 
        tipDate: payload.date, 
        tipShift: payload.shift,
        tipRestaurant: payload.restaurant
      }
    case TIP_UNSELECTED: 
      return { ...state,
        selectedTip: null,
        tipAmount: null, 
        tipDate: INITIAL_STATE.tipDate,
        tipShift: INITIAL_STATE.tipShift,
        message: payload.message || ''
      }
    case TIP_SHIFT_CHANGED:
      return { ...state, tipShift: payload };
    case TIP_RESTAURANT_CHANGED:
      return { ...state, tipRestaurant: payload };
    case TIP_DATE_CHANGED:
      console.log('Date changed!', payload, typeof(payload));
      return { ...state, tipDate: payload };
    case TIP_AMOUNT_CHANGED:
      return { ...state, tipAmount: payload.amount, message: payload.message };
    case TIP_NOTES_CHANGED:
      return { ...state, tipNotes: payload };
    case TIP_RATING_CHANGED:
      return { ...state, tipRating: payload };
    case STEP_CHANGED:
      return { ...state, step: payload };
    default:
      return state;
  }
}