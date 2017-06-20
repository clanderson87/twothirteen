import { 
  getPermissions,
  configAudio,
  startRecording,
  getRecordingUri,
  pauseRecording,
  stopRecording,
  recordingStatusReport,
  createSoundFromRecording,
  createSound,
  playSound,
  pauseSound,
  stopSound,
  setLoop,
  setVolume,
  setMute
} from './expo_common_helpers';
import { 
  RECORDING_ACTIVE, 
  RECORDING_PAUSED,
  NEAUTRALIZE_STATE,
  SOUND_LOADED,
  SOUND_PLAYING,
  ERROR
} from './types';

export const neautralizeState = () => {
  return {
    type: NEAUTRALIZE_STATE
  }
}

export const record = callback => async dispatch => {
  await configAudio();
  let recording = await startRecording(callback);
  const URI = getRecordingUri(recording);
  return dispatch({
    type: RECORDING_ACTIVE,
    payload: {
      recording,
      URI
    }
  });
}

export const pause = recording => async dispatch => {
  let _recording = await pauseRecording(recording);
  if(_recording.canRecord){
    return dispatch({
      type: RECORDING_PAUSED
    })
  } else {
    return dispatch({
      type: ERROR,
      payload: 'pauseRecording failed :('
    })
  }
};

export const finishRecording = (recording) => async dispatch => {
  try{
    let _recording = await stopRecording(recording);
    if(!_recording._canRecord && _recording._uri){
      let sound = await createSoundFromRecording(recording);
      if(sound._loaded){
        return dispatch({
          type: SOUND_LOADED,
          payload: { 
            sound,
            recording
          }
        })
      }
    } 
  }catch(e) {
      return dispatch({
        type: ERROR,
        payload: e
      })
    }
};

// export const initializeSoundFromRecording = recording => async dispatch => {
//   try {
//     let sound = await createSoundFromRecording(recording);
//     console.log('in actions, sound is ', sound);
//     if(sound._loaded){
//       return dispatch({
//         type: SOUND_LOADED,
//         payload: 
//       })
//     }
//   } catch (e){
//     return dispatch({
//       type: ERROR,
//       payload: 'debugging stop'
//     })
//   }
// }

export const playRecordedSound = sound => async dispatch => {
  console.log(sound);
  try {
    if(sound._loaded){
      await playSound(sound);
      return dispatch({
        type: SOUND_PLAYING
      })
    }
  } catch (e){
    return dispatch({
      type: ERROR,
      payload: e
    })
  }
}

export const uploadSound = sound => async dispatch => {
  // const soundToUpload = {
  //   uri: sound._uri,
  //   type: 'audio/mp4',
  //   name: 
  // }
  
  // try {

  // }
}