import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectOrders, selectOrdersIsLoading } from '../../store/orders/orders.selector';
import { fetchOrdersStart } from '../../store/orders/orders.action';
import './order-history.styles.scss';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersIsLoading);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchOrdersStart(currentUser.id));
    }
  }, [currentUser, dispatch]);

  if (!currentUser) {
    return (
      <div className='order-history-container'>
        <div className='not-logged-in'>
          <h2>Please log in to view your order history</h2>
          <p>You need to be logged in to see your orders</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='order-history-container'>
        <div className='loading'>
          <div className='spinner'></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className='order-history-container'>
        <div className='no-orders'>
          <h2>No Orders Yet</h2>
          <p>You haven&apos;t placed any orders yet.</p>
          <a href='/shop' className='continue-shopping'>Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className='order-history-container'>
      <div className='order-history-content'>
        <h1>Your Order History</h1>
        
        <div className='orders-grid'>
          {orders.map((order) => (
            <div key={order.id} className='order-card'>
              <div className='order-header'>
                <div className='order-id-section'>
                  <h3>Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                  <p className='order-date'>
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className={`order-status ${order.status}`}>
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div className='order-details'>
                <div className='detail-row'>
                  <span className='label'>Total Amount:</span>
                  <span className='value'>₹{order.total_price.toFixed(2)}</span>
                </div>
                <div className='detail-row'>
                  <span className='label'>Items:</span>
                  <span className='value'>
                    {order.order_items?.length || 0} {order.order_items?.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className='detail-row'>
                  <span className='label'>Shipping Address:</span>
                  <span className='value address'>
                    {order.shipping_address?.fullName && (
                      <>
                        {order.shipping_address.fullName},
                        {order.shipping_address.address && ` ${order.shipping_address.address}`}
                      </>
                    )}
                  </span>
                </div>
              </div>

              {order.order_items && order.order_items.length > 0 && (
                <div className='order-items'>
                  <h4>Items in this order:</h4>
                  <div className='items-list'>
                    {order.order_items.map((item) => (
                      <div key={item.id} className='order-item'>
                        {item.products?.image_url && (
                          <img src={item.products.image_url} alt={item.products?.name || 'Product'} />
                        )}
                        <div className='item-info'>
                          <p className='item-name'>{item.products?.name || 'Product'}</p>
                          <p className='item-qty'>Qty: {item.quantity}</p>
                        </div>
                        <div className='item-price'>₹{item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className='order-actions'>
                <button 
                  className='btn-view-details'
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </button>
                {(order.status === 'shipped' || order.status === 'confirmed') && (
                  <button className='btn-track'>
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className='order-modal-overlay' onClick={() => setSelectedOrder(null)}>
          <div className='order-modal' onClick={(e) => e.stopPropagation()}>
            <button className='close-btn' onClick={() => setSelectedOrder(null)}>✕</button>
            
            <div className='modal-header'>
              <h2>Order Details</h2>
              <p className='order-id'>Order #{selectedOrder.id.slice(0, 8).toUpperCase()}</p>
            </div>

            <div className='modal-content'>
              <div className='section'>
                <h3>Order Information</h3>
                <div className='info-row'>
                  <span>Order Date:</span>
                  <span>
                    {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className='info-row'>
                  <span>Status:</span>
                  <span className={`status ${selectedOrder.status}`}>
                    {selectedOrder.status.toUpperCase()}
                  </span>
                </div>
                <div className='info-row'>
                  <span>Total Amount:</span>
                  <span className='amount'>₹{selectedOrder.total_price.toFixed(2)}</span>
                </div>
              </div>

              <div className='section'>
                <h3>Shipping Address</h3>
                {selectedOrder.shipping_address ? (
                  <>
                    <p>{selectedOrder.shipping_address.fullName}</p>
                    <p>{selectedOrder.shipping_address.address}</p>
                    <p>
                      {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} {selectedOrder.shipping_address.zipCode}
                    </p>
                    <p>{selectedOrder.shipping_address.country}</p>
                    <p className='contact'>{selectedOrder.shipping_address.email}</p>
                    <p className='contact'>{selectedOrder.shipping_address.phone}</p>
                  </>
                ) : (
                  <p>No shipping address available</p>
                )}
              </div>

              <div className='section'>
                <h3>Order Items</h3>
                <div className='items-detail'>
                  {selectedOrder.order_items?.map((item) => (
                    <div key={item.id} className='item-detail-row'>
                      <div className='item-col'>
                        <p className='item-name'>{item.products?.name || 'Product'}</p>
                        <p className='item-qty'>Quantity: {item.quantity}</p>
                      </div>
                      <div className='price-col'>₹{item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='section summary'>
                <div className='summary-row'>
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.total_price.toFixed(2)}</span>
                </div>
                <div className='summary-row'>
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className='summary-row total'>
                  <span>Total:</span>
                  <span>₹{selectedOrder.total_price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className='modal-actions'>
              <button className='btn-print'>Print Order</button>
              <button className='btn-close' onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
