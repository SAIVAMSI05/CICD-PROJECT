package com.klef.sdp.repository;

import com.klef.sdp.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // existing read helper
    List<Order> findByFood_Manager_Id(Long managerId);

    // bulk delete orders that reference any of the given food ids
    @Modifying
    @Query("delete from Order o where o.food.id in :foodIds")
    void deleteByFoodIdIn(@Param("foodIds") List<Long> foodIds);
    
    List<Order> findByUser_Id(Long userId);
    List<Order> findByUser_IdAndStatus(Long userId, String status);

}
