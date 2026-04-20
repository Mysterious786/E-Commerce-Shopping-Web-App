export const selectOrdersReducer = (state) => state.orders;

export const selectOrders = (state) =>
  selectOrdersReducer(state)?.orders || [];

export const selectSelectedOrder = (state) =>
  selectOrdersReducer(state)?.selectedOrder || null;

export const selectOrdersIsLoading = (state) =>
  selectOrdersReducer(state)?.isLoading || false;

export const selectOrdersError = (state) =>
  selectOrdersReducer(state)?.error || null;

export const selectOrderById = (state, orderId) => {
  const orders = selectOrders(state);
  return orders.find((order) => order.id === orderId) || null;
};

export const selectOrderCount = (state) => selectOrders(state).length;

export const selectTotalOrderValue = (state) =>
  selectOrders(state).reduce((total, order) => total + order.total_price, 0);
