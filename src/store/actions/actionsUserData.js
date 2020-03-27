import {USER_LOGIN, USER_LOGOUT, REFRESH_USER_TOKEN} from './actionTypes';
import submitData from '../../helpers/submitData';
import getData from '../../helpers/getData';
export const ActionLogin = data => async dispatch => {
  try {
    const response = await submitData('/login', data);
    if (response.data && response.data.success) {
      await dispatch({
        type: USER_LOGIN,
        payload: response.data.data,
      });
    }
    return response;
  } catch (e) {
    console.log('error', e);
    throw e;
  }
};

export const ActionLogout = () => dispatch => {
  dispatch({
    type: USER_LOGOUT,
  });
};

export const ActionRefreshToken = token => async dispatch => {
  try {
    const response = await getData('/refresh-token');
    if (response.data && response.data.success) {
      await dispatch({
        type: REFRESH_USER_TOKEN,
        payload: response.data.data,
      });
      return response;
    }
  } catch (e) {
    console.log('error', e);
    throw e;
  }
};
