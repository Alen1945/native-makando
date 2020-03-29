import {
  USER_LOGIN,
  SET_USER_PROFILE,
  USER_LOGOUT,
  REFRESH_USER_TOKEN,
  CLEAR_USER_CART,
} from './actionTypes';
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
export const setUserProfile = () => async dispatch => {
  try {
    const response = await getData('/profile');
    if (response.data && response.data.success) {
      dispatch({
        type: SET_USER_PROFILE,
        payload: response.data.data,
      });
      return response;
    }
  } catch (err) {
    throw err;
  }
};

export const ActionLogout = () => dispatch => {
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: CLEAR_USER_CART,
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
