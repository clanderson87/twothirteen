import { 
  ImagePicker,
  Permissions,
  Audio
} from 'expo';
import { OS } from '../styles';
import { imageOptions, audioOptions, playbackOptions } from '../CUSTOM_CONFIG';

const adjustURIForAndroid = sound => {
  let uri = sound._uri;
  if (uri.includes('%40')){
    uri = uri.replace('%40', '%2540');
  }
  if (uri.includes('%2F')){
    uri = uri.replace('%2F', '%252F');
  }
  uri = 'file://' + uri;
  sound._uri = uri;
  return sound;
}

const sanitizePermissionArgument = permission_arg => {
  const { CAMERA, LOCATION, AUDIO_RECORDING, CONTACTS, REMOTE_NOTIFICATIONS } = Permissions;
  let perm_to_ask;
  switch(permission_arg){
    case 'camera':
      return perm_to_ask = CAMERA;
    case 'location':
      return perm_to_ask = LOCATION;
    case 'audioRecording' || 'microphone':
      return perm_to_ask = AUDIO_RECORDING;
    case 'contacts':
      return perm_to_ask = CONTACTS;
    case 'remoteNotifications' || 'pushNotifications' || 'notifications':
      return perm_to_ask = REMOTE_NOTIFICATIONS;
    default:
      return { error: 'invalid argument to getPermissions! Acceptable arguments are: \n \'camera\', \'location\', \'audioRecording\', \'contacts\', or \'remoteNotifications\'.'}
  };
}

export const getPermissions = async permission_arg => {
  try {
    let perm_to_ask = await sanitizePermissionArgument(permission_arg);
    if(perm_to_ask.error){
      return errorHandler(perm_to_ask.error)
    } else {
      let { status } = await Permissions.getAsync(perm_to_ask);
      if (status !== 'granted') {
        let promise = await Permissions.askAsync(perm_to_ask);
        return promise.status;
      } else {
        return status;
      };
    }
    //returns one of three options: 'undertermined' || 'denied' || 'granted'.
  } catch(e){
    return errorHandler(e);
  }
};

const errorHandler = (error, message = '') => {
  return { error, message };
}

const handleImgObject = imgObject => {
  if (imgObject.cancelled) {
    //returns { cancelled: true } if user cancelled image picking or camera actions.
    return;
  } else {
    return imgObject;
    /*returns: 
    { cancelled: false, 
      uri: the URI to the local image, usable in an <Image /> tag, 
      width: width of image,
      height: height of image
    } */
  };
}

export const getImagePickerOrCamera = async arg => {
  try {
    let imgObject = {};
    if (arg === true){
      imgObject = await ImagePicker.launchImageLibraryAsync(imageOptions);
    } else if (arg === false) {
      imgObject = await ImagePicker.launchCameraAsync(imageOptions);
    };
    return handleImgObject(imgObject);
  } catch(e){
    return errorHandler(e)
  }
}

export const getImageFromPicker = async () => {
  try {
    let imgObject = await ImagePicker.launchImageLibraryAsync(imageOptions);
    return handleImgObject(imgObject);
  } catch (e){
    return errorHandler(e);
  };
};

export const launchCamera = async () => {
  try {
    let permission = await getPermissions('camera');
    if (permission === 'granted'){
      let imgObject = await ImagePicker.launchCameraAsync(imageOptions);
      return handleImgObject(imgObject);
    } else {
      return errorHandler('Please enable camera permissions to continue');
    }
  } catch (e){
    return errorHandler(e);
  }
};

const { setAudioModeAsync, setIsEnabledAsync, Recording, Sound } = Audio;

export const configAudio = async () => {
  await setIsEnabledAsync(true);
  await setAudioModeAsync(audioOptions);
}

export const startRecording = async functionArg => {
  const recording = new Recording();
  try {
    let status = await getPermissions('audioRecording');
    if (status === 'granted'){
      let result = await recording.prepareToRecordAsync();
      if (result.canRecord){
        console.log('prepareToRecord successful!');
        //recording.setCallback(functionArg);
        await recording.startAsync();
        return recording;
      }
    } else {
      return errorHandler('Please enable Audio Recording permissions to continue');
    }
  } catch(e){
    return errorHandler(e);
  }
};

export const getRecordingUri = recording => {
  try {
    return recording.getURI();
  } catch(e){
    return errorHandler(e)
  }
}

export const pauseRecording = async recording => {
  try {
    let { status } = await recording.pauseAsync();
    return status;
  } catch (e){
    return errorHandler(e);
  }
};

export const stopRecording = async recording => {
  try {
    let status = await recording.stopAndUnloadAsync();
    console.log(status);
    if(!status.canRecord && status.isDoneRecording){
      return recording;
    } else {
      return errorHandler(`canRecord is ${canRecord}. isDoneRecording is ${isDoneRecording}. `)
    }
  } catch(e){
    return errorHandler(e);
  }
};

export const recordingStatusReport = async recording => {
  try {
    let status = await recording.getStatusAsync();
    console.log('in the helper, status is ', status);
    return status;
  } catch (e){
    return errorHandler(e);
  }
}
export const createSoundFromRecording = async recording => {
  try {
    //let { sound, status } = recording.createNewLoadedSound(); This is for Expo SDK 17.0.0
    let sound = recording.getNewSound();
    if(OS === 'android'){
      sound = adjustURIForAndroid(sound);
    }
    await sound.loadAsync();
    //console.log('status is', status);
    return sound;
  }catch (e){
    return errorHandler(e);
  }
}

// export const createSound = async uri => {
//   try {
//     let dict = await Sound.create(require(uri));
//     return dict;
//   } catch (e) {
//     return errorHandler(e);
//   }
// } <- for Expo SDK 17.0.0

export const playSound = async sound => {
  let playbackStatus = await sound.playAsync();
  console.log(playbackStatus);
  return playbackStatus;
};

export const pauseSound = async sound => {
  let playbackStatus = await sound.pauseAsync();
  return playbackStatus;
};

export const stopSound = async sound => {
  let playbackStatus = await sound.stopAsync();
  return playbackStatus;
};

export const setVolume = async (sound, vol) => {
  let playbackStatus = await sound.setVolumeAsync(vol);
  return playbackStatus;
};

export const setMute = async (sound, bool) => {
  let playbackStatus = await sound.setIsMutedAsync(bool);
  return playbackStatus;
};

export const setLoop = async (sound, bool) => {
  let playbackStatus = await sound.setIsLoopingAsync(bool);
  return playbackStatus;
};