import {SET_USER_LOGIN} from './actionTypes';
import submitData from '../../helpers/submitData';

export const ActionLogin = data => async dispatch => {
  try {
    const response = await submitData('/login', data);
    console.log(response);
  } catch (e) {
    throw new Error(e);
  }
};
