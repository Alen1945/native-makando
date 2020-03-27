import {
  USER_LOGIN,
  USER_LOGOUT,
  REFRESH_USER_TOKEN,
  SET_USER_PROFILE,
} from '../actions/actionTypes';
const initialState = {
  token: '',
  dataProfile: {},
  isLogin: false,
};

const dataUser = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
    case REFRESH_USER_TOKEN:
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
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default dataUser;
