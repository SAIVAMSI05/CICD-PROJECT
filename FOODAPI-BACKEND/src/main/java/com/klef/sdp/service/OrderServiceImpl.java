package com.klef.sdp.service;

import com.klef.sdp.model.Food;
import com.klef.sdp.model.Order;
import com.klef.sdp.model.User;
import com.klef.sdp.repository.FoodRepository;
import com.klef.sdp.repository.OrderRepository;
import com.klef.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Order placeOrder(Order order) {

        // Load User from DB
        User user = userRepository.findById(order.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Load Food from DB
        Food food = foodRepository.findById(order.getFood().getId())
                .orElseThrow(() -> new RuntimeException("Food not found"));

        // Attach actual DB entities
        order.setUser(user);
        order.setFood(food);

        // Set default status
        order.setStatus("PENDING");

        return orderRepository.save(order);
    }
    
    @Override
    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByUser_Id(customerId);
    }
    
    @Override
    public List<Order> getDeliveredOrders(Long userId) {
        return orderRepository.findByUser_IdAndStatus(userId, "DELIVERED");
    }
    
    @Override
    public List<Order> getOrdersByManager(Long managerId) {
        return orderRepository.findByFood_Manager_Id(managerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }



}
