import { ORDERS_ACTION_TYPES } from './orders.type';

const INITIAL_STATE = {
  orders: [],
  selectedOrder: null,
  isLoading: false,
  error: null,
};

export const ordersReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case ORDERS_ACTION_TYPES.FETCH_ORDERS_START:
    case ORDERS_ACTION_TYPES.FETCH_ORDER_DETAILS_START:
    case ORDERS_ACTION_TYPES.CREATE_ORDER_START:
    case ORDERS_ACTION_TYPES.UPDATE_ORDER_STATUS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
        isLoading: false,
      };

    case ORDERS_ACTION_TYPES.FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        selectedOrder: payload,
        isLoading: false,
      };

    case ORDERS_ACTION_TYPES.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, payload],
        selectedOrder: payload,
        isLoading: false,
      };

    case ORDERS_ACTION_TYPES.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === payload.id ? payload : order
        ),
        selectedOrder: payload,
        isLoading: false,
      };

    case ORDERS_ACTION_TYPES.SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: payload,
      };

    case ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED:
    case ORDERS_ACTION_TYPES.FETCH_ORDER_DETAILS_FAILED:
    case ORDERS_ACTION_TYPES.CREATE_ORDER_FAILED:
    case ORDERS_ACTION_TYPES.UPDATE_ORDER_STATUS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ORDERS_ACTION_TYPES.RESET_ORDER_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
