import React from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import {useSelector, useDispatch} from 'react-redux';
import {actionLogout} from '../store/actions/actionsUserData';
import jwt_decode from 'jwt-decode';

function Routes(props) {
  const dispatch = useDispatch();
  const {isLogin, token} = useSelector(state => state.dataUser);
  if (isLogin && token) {
    const payload = jwt_decode(token);
    if (new Date(payload.exp * 1000).getTime() - new Date().getTime() <= 0) {
      return dispatch(actionLogout());
    }
    return <PrivateRoute />;
  } else {
    return <PublicRoute />;
  }
}
export default Routes;
