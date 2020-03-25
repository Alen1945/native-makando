import React from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import {useSelector} from 'react-redux';
function Routes(props) {
  const isLogin = useSelector(state => state.dataUser.isLogin);
  if (isLogin) {
    return <PrivateRoute />;
  } else {
    return <PublicRoute />;
  }
}
export default Routes;
