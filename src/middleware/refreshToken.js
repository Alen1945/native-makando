import {ActionRefreshToken} from '../store/actions/actionsUserData';
import jwt_decode from 'jwt-decode';
export default function refreshTokenMiddleware() {
  return ({dispatch, getState}) => next => action => {
    console.log(action);
    const {request} = action;
    if (!request) {
      return next(action);
    }
    const {token} = getState().dataUser;
    const refreshThreshold = new Date().getTime + 300000;
    if (token && jwt_decode(token).exp * 1000 > refreshThreshold) {
      dispatch(ActionRefreshToken());
      return next(action);
    }
    return next(action);
  };
}
