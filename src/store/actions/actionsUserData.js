import {SET_USER_LOGIN} from './actionTypes';
import submitData from '../../helpers/submitData';

export const ActionLogin = data => async dispatch => {
  try {
    const response = await submitData('/login', data);
    await dispatch({
      type: SET_USER_LOGIN,
      payload: response.data.data,
    });
    return response;
  } catch (e) {
    console.log('error', e);
    throw e;
  }
};
