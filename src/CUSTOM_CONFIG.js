import { COLOR_SCHEME } from './colors'; 
import { OS } from './styles';
import { Audio } from 'expo';

const { PRIMARY, SECONDARY } = COLOR_SCHEME;
export const versionNumber = 'v1.0';

/* ******************* AUDIO VARIABLES *************************/

const { INTERRUPTION_MODE_IOS_DO_NOT_MIX, INTERRUPTION_MODE_ANDROID_DO_NOT_MIX } = Audio;

export const audioOptions = {
  allowsRecordingIOS: true,
  interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentLockedModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
}

export const playbackOptions = {
  progressUpdateIntervalMillis: 500,
  positionMillis: 0,
  shouldPlay: false,
  rate: 1.0,
  shouldCorrectPitch: false,
  volume: 1.0,
  isMuted: false,
  isLooping: false
}

//for more info about the above config: https://docs.expo.io/versions/v17.0.0/sdk/audio.html

/* ****************** AUTH VARIABLES ********************/

export const fbPermissions = {
  permissions: ['public_profile']
}

export const googleScopes = ['profile', 'email'];

/* ******************* IMAGE PICKER VARIABLES *************************/

const androidAspectX = 16
const androidAspectY = 9

const imageOptions = {
  allowsEditing: false //wether to show UI for editing image after picked
}

if (OS === 'android'){
  imageOptions.aspect = [androidAspectX, androidAspectY]; //aspect ratio to maintain if image is editable
};
//COMMENT THIS OUT IF YOU DON'T NEED IT!!!^^^

export { imageOptions };

/* ****************** MAP VARIABLES *********************/

export const getLocationOptions = {
  enableHighAccuracy: false, //if the app doesn't need very close GPS results, set it to false. This can enable high-power usage;
  maximumAge: 36000000
}

export const initialZoom = {
  longitudeDelta: 0.04,
  latitudeDelta: 0.09
}

/* ******************* PUSH NOTIFICATION VARIABLES  *********************/

export const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

/* ****************** WELCOMESCREEN VARIABLES => Slides.js ********************/

//WELCOME SLIDES TEXT

const textOne = 'welcome to jobApp!'
const textTwo = 'Set your location, then swipe away!'
const textThree = 'Apply for jobs here!'
const textFour = 'a thing, another thing, and a third thing!'
const textFive = 'more text!'

export const welcomeSlides = [
  {text: textOne, color: PRIMARY},
  {text: textTwo, color: SECONDARY},
  {text: textThree, color: PRIMARY},
  {text: textFour, color: SECONDARY},
  {text: textFive, color: PRIMARY}
];

export const readyButtonText = "I'm ready!";

//NOTE: NOT RECOMMENDED TO HAVE MORE THAN 5 WELCOME SLIDES (THREE IS IDEAL!)