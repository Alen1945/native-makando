import {
  GET_USER_CART,
  ADD_ITEM_CART,
  CLEAR_USER_CART,
  UPADATE_ITEM_CART,
  REMOVE_ITEM_CART,
} from '../actions/actionTypes';

const initialState = {
  totalPrice: 0,
  totalTypeItems: 0,
  itemInCart: {},
};

const dataCart = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CART:
      if (action.payload) {
        return {
          ...state,
          ...action.payload,
          itemInCart: action.payload.itemInCart.reduce(
            (objectItem, item) => ({
              ...objectItem,
              [`${item.name_item}_${item.id_item}`]: item,
            }),
            {},
          ),
        };
      } else {
        return initialState;
      }
    case ADD_ITEM_CART:
      const keyItem = `${action.payload.name_item}_${action.payload.id_item}`;
      if (state.itemInCart[keyItem]) {
        return {
          ...state,
          itemInCart: {
            ...state.itemInCart,
            [keyItem]: {
              ...state.itemInCart[keyItem],
              total_items: parseInt(state.itemInCart[keyItem].total_items) + 1,
            },
          },
        };
      } else {
        return {
          ...state,
          itemInCart: {
            ...state.itemInCart,
            [keyItem]: action.payload,
          },
        };
      }
    case UPADATE_ITEM_CART:
      return {
        ...state,
        itemInCart: {
          ...state.itemInCart,
          [action.keyItem]: {
            ...state.itemInCart[action.keyItem],
            total_items: action.payload.total_items,
          },
        },
      };
    case REMOVE_ITEM_CART:
      const stateNow = Object.assign(state);
      if (delete stateNow.itemInCart[action.keyItem]) {
        return {
          ...stateNow,
        };
      }
    case CLEAR_USER_CART:
      return initialState;
    default:
      return state;
  }
};
export default dataCart;
