package com.klef.sdp.controller;

import com.klef.sdp.model.Order;
import com.klef.sdp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> place(@RequestBody Order order) {
        System.out.println("Received Order:");
        System.out.println("User ID = " + (order.getUser() != null ? order.getUser().getId() : null));
        System.out.println("Food ID = " + (order.getFood() != null ? order.getFood().getId() : null));
        System.out.println("Quantity = " + order.getQuantity());

        try {
            Order saved = orderService.placeOrder(order);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Order Failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/customer/{customerId}")
    public List<Order> getOrdersByCustomer(@PathVariable Long customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }
    
    @GetMapping("/history/{userId}")
    public List<Order> getOrderHistory(@PathVariable Long userId) {
        return orderService.getDeliveredOrders(userId);
    }
    
    @GetMapping("/manager/{managerId}")
    public List<Order> getOrdersByManager(@PathVariable Long managerId) {
        return orderService.getOrdersByManager(managerId);
    }

    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
        return orderService.updateOrderStatus(orderId, status);
    }


}
