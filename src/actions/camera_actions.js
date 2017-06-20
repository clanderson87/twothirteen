import { ImagePicker, Permissions } from 'expo';
import { getPermissions, getImagePickerOrCamera } from './expo_common_helpers';
import { 
  IMAGE_CANCELLED, 
  IMAGE_SELECTED, 
  ERROR,
  TOGGLE_PICKER
} from './types';

export const takeOrSelectPicture = (arg) => async dispatch => {
  console.log('camera_actions/takeOrSelectPicture firing with', arg);
  try {
    let img = await getImagePickerOrCamera(arg);
    if(!img.cancelled){
      return dispatch({
        type: IMAGE_SELECTED,
        payload: img
      });
    } else {
      return dispatch({
        type: IMAGE_CANCELLED
      });
    }
  } catch (e){
    console.log('error at camera_actions/takeOrSelectPicture firing with', arg);
    return dispatch({
      type: ERROR,
      payload: e
    })
  }
}

export const toggleCameraOrPicker = choice => {
  return {
    type: TOGGLE_PICKER,
    payload: !choice
  };
}

