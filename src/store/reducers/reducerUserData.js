import {SET_USER_LOGIN, SET_USER_PROFILE} from '../actions/actionTypes';
const initialState = {
  token: '',
  dataProfile: {},
  isLogin: false,
};

const dataUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        isLogin: true,
        dataProfile: action.payload.dataUser,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        dataProfile: action.payload,
      };
    default:
      return state;
  }
};
export default dataUser;
