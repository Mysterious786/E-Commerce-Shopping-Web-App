import { takeLatest, put, all, call } from 'redux-saga/effects';
import { ORDERS_ACTION_TYPES } from './orders.type';
import {
  fetchOrdersSuccess,
  fetchOrdersFailed,
  fetchOrderDetailsSuccess,
  fetchOrderDetailsFailed,
  createOrderSuccess,
  createOrderFailed,
  updateOrderStatusSuccess,
  updateOrderStatusFailed,
} from './orders.action';

import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from '../../utils/supabase/supabase.client';

export function* fetchOrders({ payload: userId }) {
  try {
    const { data: orders, error } = yield call(getOrders, userId);
    if (error) throw error;
    yield put(fetchOrdersSuccess(orders || []));
  } catch (error) {
    yield put(fetchOrdersFailed(error.message || 'Failed to fetch orders'));
  }
}

export function* fetchOrderDetails({ payload: orderId }) {
  try {
    const { data: order, error } = yield call(getOrderById, orderId);
    if (error) throw error;
    yield put(fetchOrderDetailsSuccess(order));
  } catch (error) {
    yield put(fetchOrderDetailsFailed(error.message || 'Failed to fetch order details'));
  }
}

export function* createNewOrder({ payload: { userId, items, totalPrice, shippingAddress } }) {
  try {
    const { data: order, error } = yield call(
      createOrder,
      userId,
      items,
      totalPrice,
      shippingAddress
    );
    if (error) throw error;
    yield put(createOrderSuccess(order));
  } catch (error) {
    yield put(createOrderFailed(error.message || 'Failed to create order'));
  }
}

export function* updateOrderStatusHandler({ payload: { orderId, status } }) {
  try {
    const { data: order, error } = yield call(updateOrderStatus, orderId, status);
    if (error) throw error;
    yield put(updateOrderStatusSuccess(order[0]));
  } catch (error) {
    yield put(updateOrderStatusFailed(error.message || 'Failed to update order status'));
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(ORDERS_ACTION_TYPES.FETCH_ORDERS_START, fetchOrders);
}

export function* onFetchOrderDetailsStart() {
  yield takeLatest(ORDERS_ACTION_TYPES.FETCH_ORDER_DETAILS_START, fetchOrderDetails);
}

export function* onCreateOrderStart() {
  yield takeLatest(ORDERS_ACTION_TYPES.CREATE_ORDER_START, createNewOrder);
}

export function* onUpdateOrderStatusStart() {
  yield takeLatest(ORDERS_ACTION_TYPES.UPDATE_ORDER_STATUS_START, updateOrderStatusHandler);
}

export function* ordersSagas() {
  yield all([
    call(onFetchOrdersStart),
    call(onFetchOrderDetailsStart),
    call(onCreateOrderStart),
    call(onUpdateOrderStatusStart),
  ]);
}
