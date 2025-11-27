package com.klef.sdp.service;

import com.klef.sdp.model.Order;
import java.util.List;

public interface OrderService {
    Order placeOrder(Order order);
    List<Order> getOrdersByManager(Long managerId);
    Order updateOrderStatus(Long orderId, String status);
    List<Order> getOrdersByCustomer(Long customerId);
    List<Order> getDeliveredOrders(Long userId);

}
