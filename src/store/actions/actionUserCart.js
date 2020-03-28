import {
  GET_USER_CART,
  ADD_ITEM_CART,
  UPADATE_ITEM_CART,
  CLEAR_USER_CART,
  REMOVE_ITEM_CART,
} from './actionTypes';

import getData from '../../helpers/getData';
import submitData from '../../helpers/submitData';
import patchData from '../../helpers/patchData';
import deleteData from '../../helpers/deleteData';
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
export const itemToCart = (idItem, nameItem) => async dispatch => {
  try {
    const response = await submitData('/carts', {
      id_item: idItem,
      total_items: 1,
    });
    if (response.data && response.data.success) {
      dispatch({
        type: ADD_ITEM_CART,
        payload: {
          _id: response.data.data.idCart,
          id_item: idItem,
          name_item: nameItem,
          total_items: 1,
        },
      });
    }
    return response;
  } catch (err) {
    throw err;
  }
};
export const updateItemCart = (keyItem, idCart, data) => async dispatch => {
  try {
    const response = await patchData('/carts/' + idCart, data);
    console.log('update', response.data);
    if (response.data && response.data.success) {
      dispatch({
        type: UPADATE_ITEM_CART,
        payload: data,
        keyItem: keyItem,
      });
    }
    return response;
  } catch (err) {
    throw err;
  }
};
export const removeItemCart = (keyItem, idCart) => async dispatch => {
  try {
    const response = await deleteData('/carts/' + idCart);
    if (response.data && response.data) {
      dispatch({
        type: REMOVE_ITEM_CART,
        keyItem: keyItem,
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
