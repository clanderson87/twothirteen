import { BAR_CODE_READ, ERROR } from './types';

export const barCodeReadAction = payload => {
  //fill this with the proper implementation!
  return {
    type: BAR_CODE_READ,
    payload
  }
}

export const permissionDenied = () => {
  return {
    type: ERROR,
    payload: 'Camera permission denied :('
  }
} 