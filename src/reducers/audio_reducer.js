import { 
  RECORDING_ACTIVE,
  RECORDING_PAUSED,
  NEAUTRALIZE_STATE,
  SOUND_LOADED,
  SOUND_PLAYING,
  ERROR
} from '../actions/types';

export default (state = {}, { type, payload }) => {
  switch(type){
    case RECORDING_ACTIVE:
      return { ...state, recording: payload.recording, uri: payload.URI, isPaused: false };
    case RECORDING_PAUSED:
      return { ...state, isPaused: true };
    case NEAUTRALIZE_STATE:
      return { ...state, recording: undefined, sound: undefined, error: null };
    case SOUND_LOADED:
      return { ...state, sound: payload.sound, isPaused: true, recording: null, previousRecording: payload.recording };
    case SOUND_PLAYING:
      return { ...state, isPaused: false };
    case ERROR:
      return { ...state, error: payload };
    default: 
      return state;
  }
}