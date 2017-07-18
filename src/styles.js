import { Dimensions, Platform } from 'react-native';
import { TUTORIAL_TEXT_COLOR, BUTTON_COLOR } from './colors';

/* ****************** COMMON STYLES *********************** */

const CENTER = 'center';
const WINDOW = Dimensions.get('window');
const SCREEN_WIDTH = WINDOW.width;
const SCREEN_HEIGHT = WINDOW.height;
export const OS = Platform.OS;
export const fullScreen = { flex: 1 }
export const fullCentered = { flex: 1, justifyContent: 'center' };


/* ****************** for use with WelcomeScreen.js > Slides.js ******************* */

export const slideTextStyle = {
  fontSize: 30,
  color: TUTORIAL_TEXT_COLOR,
  textAlign: CENTER
};

export const slideSubTextStyle = {
  fontSize: 16,
  color: TUTORIAL_TEXT_COLOR,
  textAlign: CENTER
};

export const slideStyle = {
  flex: 1,
  justifyContent: CENTER,
  alignItems: CENTER,
  width: SCREEN_WIDTH
};

export const buttonStyle = {
  backgroundColor: BUTTON_COLOR,
  marginVertical: 15
}

/* ******************** for use with DashboardScreen.js ******************** */

export const FABstyle = {

}

// /* ****************** for use with CameraScreen.js > .js ******************* */

// export const imageViewStyle = (height) => {
//   return {
//     height,
//     width: SCREEN_WIDTH//,
//     //flex: 5
//   }
// }

// /* ****************** for use with BarCodeScannerScreen.js > .js ******************* */

// export const BarCodeScannerStyle = {
//   height: 200,
//   width: 200
// };