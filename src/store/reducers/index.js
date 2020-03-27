import {combineReducers} from 'redux';
import dataUser from './reducerUserData';
import dataCart from './reducerUserCart';
export default combineReducers({
  dataUser,
  dataCart,
});
