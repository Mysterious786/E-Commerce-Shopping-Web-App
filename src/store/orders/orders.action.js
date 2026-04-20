import { ORDERS_ACTION_TYPES } from './orders.type';

export const fetchOrdersStart = (userId) => ({
  type: ORDERS_ACTION_TYPES.FETCH_ORDERS_START,
  payload: userId,
});

export const fetchOrdersSuccess = (orders) => ({
  type: ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrdersFailed = (error) => ({
  type: ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED,
  payload: error,
});

export const fetchOrderDetailsStart = (orderId) => ({
  type: ORDERS_ACTION_TYPES.FETCH_ORDER_DETAILS_START,
  payload: orderId,
});

export const fetchOrderDetailsSuccess = (order) => ({
  type: ORDERS_ACTION_TYPES.FETCH_ORDER_DETAILS_SUCCESS,
  payload: order,
});

export const fetchOrderDetailsFailed = (error) => ({
  type: ORDERS_ACTION_TYPES.FETCH_ORDER_DETAILS_FAILED,
  payload: error,
});

export const createOrderStart = (orderData) => ({
  type: ORDERS_ACTION_TYPES.CREATE_ORDER_START,
  payload: orderData,
});

export const createOrderSuccess = (order) => ({
  type: ORDERS_ACTION_TYPES.CREATE_ORDER_SUCCESS,
  payload: order,
});

export const createOrderFailed = (error) => ({
  type: ORDERS_ACTION_TYPES.CREATE_ORDER_FAILED,
  payload: error,
});

export const updateOrderStatusStart = (orderId, status) => ({
  type: ORDERS_ACTION_TYPES.UPDATE_ORDER_STATUS_START,
  payload: { orderId, status },
});

export const updateOrderStatusSuccess = (order) => ({
  type: ORDERS_ACTION_TYPES.UPDATE_ORDER_STATUS_SUCCESS,
  payload: order,
});

export const updateOrderStatusFailed = (error) => ({
  type: ORDERS_ACTION_TYPES.UPDATE_ORDER_STATUS_FAILED,
  payload: error,
});

export const setSelectedOrder = (order) => ({
  type: ORDERS_ACTION_TYPES.SET_SELECTED_ORDER,
  payload: order,
});

export const resetOrderState = () => ({
  type: ORDERS_ACTION_TYPES.RESET_ORDER_STATE,
});
