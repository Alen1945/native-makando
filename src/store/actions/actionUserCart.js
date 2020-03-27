import {GET_USER_CART, ADD_ITEM_CART, CLEAR_USER_CART} from './actionTypes';

import getData from '../../helpers/getData';
import submitData from '../../helpers/submitData';
export const getUserCart = () => async dispatch => {
  try {
    const response = await getData('/carts');
    if (response.data && response.data.success) {
      dispatch({
        type: GET_USER_CART,
        payload: response.data.data,
      });
    }
    return response;
  } catch (err) {
    throw err;
  }
};
export const itemToCart = (id, name) => async dispatch => {
  try {
    const response = await submitData('/carts', {id_item: id, total_items: 1});
    if (response.data && response.data.success) {
      dispatch({
        type: ADD_ITEM_CART,
        payload: {
          _id: response.data.data.idCart,
          id_item: id,
          name_item: name,
          total_items: 1,
        },
      });
    }
    return response;
  } catch (err) {
    throw err;
  }
};
export const clearUserCart = () => dispatch => {
  dispatch({
    type: CLEAR_USER_CART,
  });
};
